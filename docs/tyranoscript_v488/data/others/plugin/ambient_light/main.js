'use strict'
;((TG) => {
  // 多重読み込みの禁止
  if (TG.stat.ambient_light_config !== undefined) {
    return
  }

  // ステータスを作成
  TG.stat.ambient_light_config = {
    auto_adjust_color: true,
    ambient_color: '',
    shadow: true,
    shadow_size: '',
    shadow_color: '',
    shadow_opacity: '',
    blend_mode: '',
    hard_light: true,
    light_cross_fade: true,
    default_shadow: true,
    default_shadow_size: 16,
    default_shadow_opacity: 0.3,
    storage_map: {},
  }

  // 環境
  // "iphone", "android", "pc"
  const env = $.userenv()

  // ブラウザ
  // "chrome", "safari", "edge", "firefox", ...
  const browser = $.getBrowser()

  // プラグインがサポートされていない環境ならばtrue
  // - Safari または iOS
  const is_not_supported = browser === 'safari' || env === 'iphone'

  // Nodeで駆動しているか
  const is_node = ($.isElectron && $.isElectron()) || $.isNWJS()

  // サポートされているか
  // - iOS でも Safari でもない場合はOK（Mac × Electron、Mac × Chrome は OK）
  // - Node.js 環境もOK
  // - [plugin force="true"]で強制的に有効（デバッグ用）
  const is_supported = !is_not_supported || is_node || TG.stat.mp.force === 'true'

  alert({ browser, is_node, is_not_supported, is_supported })

  // filterプロパティに当てるスタイル
  const filter_value = is_supported ? 'url(#ambient_light_filter)' : ''

  // フィルターサイズ
  const filter_width = TG.stat.mp.width || '1000'
  const filter_height = TG.stat.mp.height || '2000'

  // 連動するタグ カンマ区切りで複数指定可
  const link_target_tag = TG.stat.mp.link || 'bg'

  // SVG Filterの追加
  const j_svg = $(`<svg viewbox="0 0 0 0" style="visible: hidden;">
    <defs>
      <filter id="ambient_light_filter" width="${filter_width}" height="${filter_height}">
        <feFlood id="ambient_light_feflood" flood-color="white" flood-opacity="1" />
        <feComposite in="ambient_light_feflood" in2="SourceAlpha" operator="atop" result="color_1"/>
        
        <feFlood id="ambient_light_feflood_2" flood-color="white" flood-opacity="1" />
        <feComposite in="ambient_light_feflood_2" in2="SourceAlpha" operator="atop" result="color_2"/>
      
        <feBlend id="ambient_light_feblend_1" in="color_1" in2="SourceGraphic" mode="multiply" result="blend_main"/>
        <feBlend id="ambient_light_feblend_2" in="color_2" in2="SourceGraphic" mode="hard-light" result="blend_sub"/>
        <feComponentTransfer id="feComponentTransfer" in="blend_sub" result="blend_sub_alpha">
          <feFuncA id="ambient_light_alpha" type="linear" slope="0"/>
        </feComponentTransfer>
        <feBlend in="blend_sub_alpha" in2="blend_main" mode="normal"/>
        <feDropShadow id="ambient_light_shadow" dx="0" dy="0" stdDeviation="12" flood-color="white" flood-opacity="0" />
      </filter>
    </defs>
  </svg>`).appendTo('body')

  // <feFlood>, <feBlend>, <feDropShadow>への参照
  const e_flood_main = j_svg.find('#ambient_light_feflood').get(0)
  const e_flood_sub = j_svg.find('#ambient_light_feflood_2').get(0)
  const e_blend_main = j_svg.find('#ambient_light_feblend_1').get(0)
  const e_blend_sub = j_svg.find('#ambient_light_feblend_2').get(0)
  const e_blend_opacity = j_svg.find('#ambient_light_alpha').get(0)
  const e_shadow = j_svg.find('#ambient_light_shadow').get(0)

  // 初期設定
  e_flood_main.style.setProperty('transition-property', 'flood-color')
  e_flood_main.style.setProperty('transition-timing-function', 'linear')
  e_shadow.style.setProperty('transition-property', 'flood-color flood-opacity stdDeviation')
  e_shadow.style.setProperty('transition-timing-function', 'linear')
  e_shadow.setAttribute('stdDeviation', '16')
  e_shadow.setAttribute('flood-opacity', '0.3')

  // スタイルの埋め込み
  const j_style = $('<style id="ambient_light_style" />').appendTo('body')
  TG.stat.ambient_light_config.css_map = {
    '.tyrano_chara': {
      filter: filter_value,
    },
  }

  /**
   * 埋め込んだスタイルを css_map に従って更新
   */
  const updateStyle = () => {
    const css_map = TG.stat.ambient_light_config.css_map
    let css_str = ''
    for (const selector in css_map) {
      css_str += selector + '{'
      const style_map = css_map[selector]
      for (const prop in style_map) {
        const value = style_map[prop]
        css_str += `${prop}:${value};`
      }
      css_str += '}'
    }
    j_style.text(css_str)
  }

  // 1発更新しておこう
  updateStyle()

  // キャンバスの設定
  const CANVAS_WIDTH = 4
  const CANVAS_HEIGHT = 3
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const ctx = canvas.getContext('2d')

  /**
   * 画像を代表する1色のRGB値を取得する（非同期）
   * 画像のパス（例: "./data/bgimage/room.jpg"）を渡すと
   * [0.45, 0.5, 0.66] のような0.0～1.0の数値3つの配列が返ってくる
   * 数値はそれぞれR, G, Bを意味する
   * @param {string} url
   * @returns {Promise}
   */
  const getRepresentativeColor = (url) => {
    return new Promise((resolve) => {
      let img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        const imagedata = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        const pixel_count = CANVAS_WIDTH * CANVAS_HEIGHT
        let rgb = [0, 0, 0]
        for (let i = 0; i < pixel_count; i++) {
          rgb[0] += imagedata.data[i * 4 + 0]
          rgb[1] += imagedata.data[i * 4 + 1]
          rgb[2] += imagedata.data[i * 4 + 2]
        }
        rgb = rgb.map((c) => {
          return (1 + Math.floor(c / pixel_count)) / 256
        })
        img = null
        resolve(rgb)
      }
      img.src = url
    })
  }

  /**
   * たとえば [0, 1, 1] を受け取って "rgb(0, 255, 255)" を返す
   * @param {number[]} rgb
   * @returns
   */
  const parseColorStr = (rgb) => {
    rgb = rgb.map((c) => Math.max(0, Math.min(255, Math.floor(c * 256 - 1))))
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }

  /**
   * ブレンドモードを返す "hard-light" or "soft-light"
   * @param {number[]} rgb
   * @returns {string}
   */
  const decideBlendMode = (rgb) => {
    // R, G, Bの平均
    const average_col = rgb.reduce((a, b) => a + b, 0) / 3

    // 合成モードの決定
    if (TG.stat.ambient_light_config.hard_light && average_col < 0.4) {
      // 背景が全体的に暗いときはハードライト
      return 'hard-light'
    } else {
      // 背景が明るめのときはソフトライト
      return 'soft-light'
    }
  }

  const color_cache = {}

  /**
   * Filterにセットしていく値をまとめたオプションを返す
   * @param {string} url
   * @returns {Object}
   */
  const decideFilterOptions = async (url) => {
    const config = TG.stat.ambient_light_config.storage_map[url] || {}

    if (config.once) {
      delete TG.stat.ambient_light_config.storage_map[url]
    }

    // この背景画像を代表する1色を取得する
    // eg.) [0.5, 0.66, 0.7]
    let rgb = config.ambient_rgb
    if (!rgb) {
      if (color_cache[url]) {
        rgb = color_cache[url]
      } else {
        rgb = await getRepresentativeColor(url)
        color_cache[url] = rgb
      }
    }

    // 合成モード
    let blend_mode = config.blend_mode
    if (!blend_mode) {
      blend_mode = decideBlendMode(rgb)
      // 完全黒のハードライトを当てるとキャラまで完全黒になるので最低限の明るさを担保
      if (blend_mode === 'hard-light') {
        rgb = rgb.map((c) => Math.max(0.1, c) + 0.1)
      }
    }

    // 逆光色
    let shadow_rgb = config.shadow_rgb
    if (!shadow_rgb) {
      // R, G, Bのうち最も大きな値
      const max_col = Math.max(...rgb)
      shadow_rgb = rgb.map((c) => c / max_col)
    }

    // 環境光色と逆光色をrgb()形式の文字列に変換
    const ambient_color = parseColorStr(rgb)
    const shadow_color = parseColorStr(shadow_rgb)

    // 逆光を有効にするか
    let shadow = TG.stat.ambient_light_config.default_shadow
    if (config.shadow) {
      shadow = config.shadow
    }

    // 逆光サイズ
    let shadow_size = TG.stat.ambient_light_config.default_shadow_size
    if (config.shadow_size) {
      shadow_size = config.shadow_size
    }

    // 逆光の不透明度
    let shadow_opacity = TG.stat.ambient_light_config.default_shadow_opacity
    if (config.shadow_opacity) {
      shadow_opacity = config.shadow_opacity
    }

    // オプションをまとめて返却
    return {
      ambient_color,
      blend_mode,
      shadow,
      shadow_color,
      shadow_size,
      shadow_opacity,
    }
  }

  /**
   * <filter>の中身を書き変える
   * @param {Object} options
   */
  const updateSVGFilter = async (options) => {
    const time = options.time || 0

    if (time <= 70 || TG.stat.ambient_light_config.blend_mode === options.blend_mode) {
      // - 変化時間がほぼゼロの場合
      // - クロスフェードが無効の場合
      // - ブレンドモードの変化がない場合
      // - 変化前変化後の少なくとも一方がmultiplyの場合

      // transitionの設定
      e_flood_main.style.setProperty('transition-duration', `${time}ms`)
      e_shadow.style.setProperty('transition-duration', `${time}ms`)

      // 設定値を放り込んでいく
      e_flood_main.setAttribute('flood-color', options.ambient_color)
      e_blend_main.setAttribute('mode', options.blend_mode)
    } else {
      // 時間をかけて soft-light ←→ hard-light を切り替える場合
      $(e_blend_opacity).finish()

      // transitionの設定
      e_flood_main.style.setProperty('transition-duration', `${0}ms`)
      e_shadow.style.setProperty('transition-duration', `${time}ms`)

      // 設定値を放り込んでいく
      e_blend_opacity.setAttribute('slope', 0)
      e_flood_sub.setAttribute('flood-color', options.ambient_color)
      e_blend_sub.setAttribute('mode', options.blend_mode)
      $(e_blend_opacity)
        .animate({ _slope: 0 }, 0)
        .animate(
          { _slope: 1 },
          {
            duration: time,
            step: (now) => {
              e_blend_opacity.setAttribute('slope', now)
            },
            complete: () => {
              e_flood_main.setAttribute('flood-color', options.ambient_color)
              e_blend_main.setAttribute('mode', options.blend_mode)
              e_blend_opacity.setAttribute('slope', '0')
            },
          },
        )
    }

    if (options.shadow) {
      e_shadow.setAttribute('flood-color', options.shadow_color)
      e_shadow.setAttribute('stdDeviation', options.shadow_size)
      e_shadow.setAttribute('flood-opacity', options.shadow_opacity)
    } else {
      e_shadow.setAttribute('flood-opacity', '0')
    }

    // ステータスに保存
    TG.stat.ambient_light_config.ambient_color = options.ambient_color
    TG.stat.ambient_light_config.shadow_color = options.shadow_color
    TG.stat.ambient_light_config.shadow = options.shadow
    TG.stat.ambient_light_config.shadow_size = options.shadow_size
    TG.stat.ambient_light_config.shadow_opacity = options.shadow_opacity
    TG.stat.ambient_light_config.blend_mode = options.blend_mode
  }

  /**
   * "#FF0000", "0xFF0000", "rgb(255, 0, 0)" のような文字列を受け取って
   * [1, 0.00390625, 0.00390625] のような配列を返す
   * @param {string} _str
   * @returns
   */
  const parseRGB = (_str) => {
    let str = _str.trim()
    let flag_16 = true
    if (str.match(/^0x/)) {
      str = str.replace(/^0x/, '')
      flag_16 = true
    } else if (str.match(/^#/)) {
      str = str.replace(/^#/, '')
      flag_16 = true
    } else if (str.match(/^rgba?\(([^)]+)\)/)) {
      str = str.replace(/^rgba?\(([^)]+)\)/, '$1')
      flag_16 = false
    }
    if (flag_16) {
      const r = parseInt(str.substring(0, 2), 16)
      const g = parseInt(str.substring(2, 4), 16)
      const b = parseInt(str.substring(4, 6), 16)
      return [(1 + r) / 256, (1 + g) / 256, (1 + b) / 256]
    } else {
      return str.split(',').map((item) => {
        return (1 + parseInt(item)) / 256
      })
    }
  }

  /**
   * ロード時の復元
   */
  const restore = () => {
    updateSVGFilter(TG.stat.ambient_light_config)
    updateStyle()
  }

  // ================================
  // [bg]タグへの割り込み
  // ================================

  link_target_tag.split(',').forEach((_tag_name) => {
    const tag_name = _tag_name.trim()
    if (!tag_name) {
      return
    }
    if (!is_supported) {
      return
    }
    if (!TG.ftag.master_tag[tag_name]) {
      return
    }

    // もともとのstartメソッドを保存
    const original_start = TG.ftag.master_tag[tag_name].start

    // 改めて定義
    TG.ftag.master_tag[tag_name].start = async (pm) => {
      // 環境光色の自動調整が有効の場合に限り割り込み処理
      if (TG.stat.ambient_light_config.auto_adjust_color) {
        const url = pm.storage.match(/^https?:\/\//) ? pm.storage : `./data/bgimage/${pm.storage}`
        const options = await decideFilterOptions(url)
        options.time = parseInt(TG.cutTimeWithSkip(pm.time)) || 0
        updateSVGFilter(options)
      }

      // 保存しておいたstartメソッドを呼び出す
      original_start.call(TG.ftag.master_tag[tag_name], pm)
    }
  })

  // ================================
  // [ambient_light_config]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_config = {
    kag: TG,

    pm: {
      auto: '',
      shadow: '',
      shadow_size: '',
      shadow_opacity: '',
      name: '',
      hard_light: '',
    },

    start: async (pm) => {
      const config = TG.stat.ambient_light_config
      if (pm.auto) {
        config.auto_adjust_color = pm.auto === 'true'
      }
      if (pm.shadow) {
        config.default_shadow = pm.shadow === 'true'
      }
      if (pm.shadow_size) {
        config.default_shadow_size = parseInt(pm.shadow_size)
      }
      if (pm.shadow_opacity) {
        config.default_shadow_opacity = parseInt(pm.shadow_opacity)
      }
      if (pm.hard_light) {
        config.hard_light = pm.auto === 'true'
      }
      if (pm.name) {
        TG.stat.ambient_light_config.css_map['.' + pm.name] = {
          filter: filter_value,
        }
        updateStyle()
      }
      TG.ftag.nextOrder()
    },
  }

  // ================================
  // [ambient_light]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light = {
    kag: TG,

    pm: {
      color: '',
      shadow: '',
      shadow_color: '',
      shadow_size: '',
      shadow_opacity: '',
      storage: '',
      folder: 'bgimage',
      time: '',
      name: '',
    },

    start: async (pm) => {
      // 非サポート環境では即nextOrder
      if (!is_supported) {
        TG.ftag.nextOrder()
        return
      }

      if (pm.storage) {
        const url = pm.storage.match(/^https?:\/\//)
          ? pm.storage
          : `./data/${pm.folder}/${pm.storage}`
        const options = await decideFilterOptions(url)
        options.time = parseInt(TG.cutTimeWithSkip(pm.time)) || 0
        updateSVGFilter(options)
      }
      if (pm.name) {
        $('.' + pm.name).css('filter', filter_value)
      }
      let options = {}
      if (pm.color) {
        if (pm.color === 'none') {
          options.ambient_color = '#FFFFFF'
          options.blend_mode = 'multiply'
        } else {
          options.ambient_color = pm.color
        }
      }
      if (pm.mode) {
        options.blend_mode = pm.mode
      }
      if (pm.shadow) {
        options.shadow = pm.shadow === 'true'
      }
      if (pm.shadow_size) {
        options.shadow_size = pm.shadow_size
      }
      if (pm.shadow_color) {
        options.shadow_color = pm.shadow_color
      }
      if (pm.shadow_opacity) {
        options.shadow_opacity = pm.shadow_opacity
      }
      if (Object.keys(options).length > 0) {
        options = $.extend({}, TG.stat.ambient_light_config, options)
        options.time = parseInt(TG.cutTimeWithSkip(pm.time)) || 0
        updateSVGFilter(options)
      }
      TG.ftag.nextOrder()
    },
  }

  // ================================
  // [ambient_light_def]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_def = {
    vital: ['color', 'storage'],

    kag: TG,

    pm: {
      color: '',
      mode: '',
      shadow: 'true',
      shadow_color: '',
      shadow_opacity: '0.3',
      shadow_size: '16',
      storage: '',
      folder: 'bgimage',
      once: '',
    },

    start: async (pm) => {
      // 非サポート環境では即nextOrder
      if (!is_supported) {
        TG.ftag.nextOrder()
        return
      }

      // 環境光色を変換
      const color = pm.color === 'none' ? '#FFFFFF' : pm.color
      let ambient_rgb = parseRGB(color)

      // ブレンドモードを決定する
      let blend_mode
      if (pm.color === 'none') {
        blend_mode = 'multiply'
      } else if (pm.mode) {
        // 直接指定
        blend_mode = pm.mode
      } else {
        // 自動決定
        blend_mode = decideBlendMode(ambient_rgb)
        if (blend_mode === 'hard-light') {
          ambient_rgb = ambient_rgb.map((c) => Math.max(0.1, c) + 0.1)
        }
      }

      // 逆光色を決定する
      let shadow_rgb = ''
      if (pm.shadow_color) {
        // 直接指定
        shadow_rgb = parseRGB(pm.shadow_color)
      } else {
        // 自動決定
        const max_col = Math.max(...ambient_rgb)
        shadow_rgb = ambient_rgb.map((c) => c / max_col)
      }

      const shadow_size = parseInt(pm.shadow_size)
      const shadow_opacity = parseInt(pm.shadow_opacity)
      const shadow = pm.shadow !== 'false'

      const url = pm.storage.match(/^https?:\/\//)
        ? pm.storage
        : `./data/${pm.folder}/${pm.storage}`

      TG.stat.ambient_light_config.storage_map[url] = {
        ambient_rgb,
        blend_mode,
        shadow,
        shadow_rgb,
        shadow_size,
        shadow_opacity,
      }

      if (pm.once === 'true') {
        TG.stat.ambient_light_config.storage_map[url].once = true
      }

      TG.ftag.nextOrder()
    },
  }

  // ================================
  // [ambient_light_def_del]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_def_del = {
    vital: ['storage'],

    kag: TG,

    pm: {
      storage: '',
      folder: 'bgimage',
    },

    start: async (pm) => {
      // 非サポート環境では即nextOrder
      if (!is_supported) {
        TG.ftag.nextOrder()
        return
      }

      const url = pm.storage.match(/^https?:\/\//)
        ? pm.storage
        : `./data/${pm.folder}/${pm.storage}`

      delete TG.stat.ambient_light_config.storage_map[url]

      TG.ftag.nextOrder()
    },
  }

  // ================================
  // [ambient_light_restore]タグ定義
  // ================================

  TG.ftag.master_tag.ambient_light_restore = {
    kag: TG,

    pm: {},

    start: async () => {
      // 非サポート環境では即nextOrder
      if (!is_supported) {
        TG.ftag.nextOrder()
        return
      }

      restore()
      TG.ftag.nextOrder()
    },
  }

  // TYRANO.kag.onが使えるなら使おう
  if (TG.on !== undefined) {
    TG.on('load:complete', () => {
      restore()
    })
  }
})(TYRANO.kag)
