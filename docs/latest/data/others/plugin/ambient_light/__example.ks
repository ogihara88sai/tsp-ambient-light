
;プラグイン読み込み！
;[bg]タグに連動して環境光を変えるよ
[plugin name="ambient_light" link="bg"]


;このあたりはプラグインに直接関係のないメッセージウィンドウ設定やキャラ定義です
;デフォルトプロジェクトの素材＋きまぐれアフターさんの背景素材を使っています
[position left="160" top="500" width="1000" height="200"]
[position margint="45" marginl="50" marginr="70" marginb="60"]
[ptext name="chara_name_area" layer="message0" color="white" size="28" bold="true" x="180" y="510" shadow="black"]
[chara_config ptext="chara_name_area"]
[bg storage="umi1.jpg" time="0"]
[chara_new  name="akane"  storage="chara/akane/normal.png" jname="あかね"]
[chara_new  name="yamato" storage="chara/yamato/normal.png" jname="やまと"]
[chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
[chara_face name="akane" face="doki"  storage="chara/akane/doki.png"]
[chara_face name="akane" face="happy" storage="chara/akane/happy.png"]
[chara_face name="akane" face="sad"   storage="chara/akane/sad.png"]
[image name="dummy" layer="0" storage="../fgimage/chara/akane/normal.png" x="900" y="120"]
[ptext layer="0" color="white" size="28" bold="true" x="1070" y="100" text="比較用" edge="4px black"]
[chara_show name="akane" time="100"]
[chara_show name="yamato" time="100"]
[deffont bold="true" shadow="black"]
[resetfont]


*start

#akane
夕方の海に移動するよ[p]

[bg storage="umi2.jpg" time="800"]

#akane:happy
つぎは夜の海に移動するよ[p]

[bg storage="umi3.jpg" time="800"]

#akane:default
つぎは昼の駅前に移動するよ[p]

[bg storage="eki1.jpg" time="800"]

つぎは夕方の駅前に移動するよ[p]

[bg storage="eki2.jpg" time="800"]

つぎは夜の駅前に移動するよ[p]

[bg storage="eki3.jpg" time="800"]

つぎは深夜の駅前に移動するよ[p]

[bg storage="eki4.jpg" time="800"]

つぎは逆光をオフにするよ[p]

[ambient_light shadow_opacity="0" time="800"]

つぎは環境光をオフにするよ[p]

[ambient_light color="none" time="800"]

つぎは環境光を赤くするよ[p]

[ambient_light color="#ffbbbb" time="800"]

「eki3.jpg」の環境光を直接定義するよ（自動環境光調整が行われなくなるよ）[p]

[ambient_light_def storage="eki3.jpg" color="rgb(50, 50, 100)"]
[bg storage="eki3.jpg" time="800"]

自動調整のときより青っぽくなったね[p]

[bg storage="eki2.jpg" time="800"]
[bg storage="eki3.jpg" time="800"]

以後、この指定した色が使われるようになるよ[p]
さっきの「eki3.jpg」の環境光定義を削除して、また自動調整を有効にするよ[p]

[ambient_light_def_del storage="eki3.jpg"]
[bg storage="eki3.jpg" time="800"]

キャラ以外の画像にも環境光を適用できるよ[p]

[ambient_light name="dummy"]

ほら[p]
でも、これだと1回消してもう1度表示したときにはもとに戻る[p]

[free layer="0" name="dummy" time="500" wait="true"]
[image name="dummy" layer="0" storage="../fgimage/chara/akane/normal.png" x="900" y="120" time="500" wait="true"]

ほら[p]
でも、ambient_light_configで指定しておけば、出し入れしても固定で環境光が当たり続けるよ[p]

[ambient_light_config name="dummy"]

[free layer="0" name="dummy" time="500" wait="true"]
[image name="dummy" layer="0" storage="../fgimage/chara/akane/normal.png" x="900" y="120" time="500" wait="true"]

[free layer="0" name="dummy" time="500" wait="true"]
[image name="dummy" layer="0" storage="../fgimage/chara/akane/normal.png" x="900" y="120" time="500" wait="true"]

#akane:happy
ね[p]

#akane:default
ハードライトを無効にして最初に戻るね[p]

[ambient_light_config hard_light="false"]

[jump target="start"]