/**
 * js/products.js — HINOKA 商品マスターデータ
 * 全ページ共通。<script src="js/products.js"> で読み込む。
 */
(function () {
  function imgs(id) {
    return [1,2,3,4,5].map(n => `assets/images/${id.toLowerCase()}-${n}.jpg`);
  }

  window.HINOKA_PRODUCTS = [

    // ══════════════════════════════════════════════════════
    // FOR BUSINESS — Office Supplies / オフィス用品
    // ══════════════════════════════════════════════════════
    {id:'B001',name:'プロ用ラベルプリンター',price:12800,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'業務用途に最適なプロ仕様のラベルプリンター。USB・Bluetooth接続対応、幅広いラベルサイズに対応します。',
     specs:'印刷幅：最大108mm / 解像度：300dpi / 接続：USB・Bluetooth / サイズ：W160×D230×H150mm / 重量：1.2kg'},

    {id:'B002',name:'ラベルシール A4 100枚入',price:980,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#ffffff'],sizes:['A4'],stock:0,moq:5,
     desc:'各種プリンター対応の高品質ラベルシール。はがれにくい強粘着タイプ。',
     specs:'サイズ：A4（210×297mm）/ 枚数：100枚 / 粘着：強粘着 / 対応：レーザー・インクジェット'},

    {id:'B003',name:'A4ファイル 10冊セット',price:2200,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#1a3a6b','#8b0000','#2c5f2e'],sizes:['FREE'],stock:0,moq:1,
     desc:'耐久性の高いポリプロピレン製ファイル。見出しラベル付き、大容量収納可能。',
     specs:'サイズ：A4 / 背幅：約30mm / 材質：PP / セット内容：10冊'},

    {id:'B004',name:'ジェルボールペン 12本セット',price:1480,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#000000','#1a3a6b','#8b0000'],sizes:['0.5mm'],stock:0,moq:1,
     desc:'なめらかな書き心地のジェルインクボールペン。ビジネスシーンで映えるデザイン。',
     specs:'インク：ジェル / 線幅：0.5mm / セット内容：12本（黒8本・青2本・赤2本）'},

    {id:'B005',name:'A5ノート 5冊セット',price:1200,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#f5f0e8'],sizes:['A5'],stock:0,moq:1,
     desc:'上質紙を使用したA5ノート。会議・商談・業務日誌に最適な5冊セット。',
     specs:'サイズ：A5 / ページ数：80枚 / 罫線：横罫5mm / 材質：上質紙80g/m²'},

    {id:'B006',name:'スチール デスクトレー 3段',price:3800,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'頑丈なスチール製3段デスクトレー。書類整理に最適なビジネス仕様。',
     specs:'素材：スチール / 段数：3段 / サイズ：W315×D240×H220mm / 重量：1.5kg'},

    {id:'B007',name:'付箋セット 6色 600枚',price:880,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f6c90e','#ff7070','#69d2e7','#a8e6a3','#ffb347','#d4b0ff'],sizes:['FREE'],stock:0,moq:2,
     desc:'鮮やかな6色セット。くり返し貼れる弱粘着タイプ。ページ仕分けや備忘録に。',
     specs:'サイズ：75×75mm / 枚数：各100枚（計600枚）/ 粘着：弱粘着 / 色：6色'},

    {id:'B008',name:'ホッチキス＋針セット',price:1650,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'大容量30枚綴じ対応のホッチキス。針1箱（1000本）付属。',
     specs:'綴じ枚数：最大30枚 / 使用針：No.10 / 針付属：1000本 / サイズ：W145×D60×H60mm'},

    {id:'B009',name:'竹製デスクオーガナイザー',price:4500,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['FREE'],stock:0,moq:1,
     desc:'天然竹素材の高級感あるデスクオーガナイザー。ペン・名刺・小物を整頓。',
     specs:'素材：天然竹 / 仕切り：5区画 / サイズ：W280×D120×H100mm'},

    {id:'B010',name:'卓上カレンダー 2026',price:1100,
     category:'office-supplies',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#ffffff'],sizes:['FREE'],stock:0,moq:1,
     desc:'シンプルデザインの卓上カレンダー。月曜始まり・祝日表記あり。',
     specs:'サイズ：W150×H230mm / 仕様：月曜始まり / 印刷：2色刷り'},

    // ── For Business — Packaging Materials / 梱包資材 ──
    {id:'B011',name:'OPP袋 A4サイズ 100枚',price:880,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['A4','B5','A5'],stock:0,moq:10,
     desc:'透明度の高い厚手OPP袋。商品梱包・ラッピングに最適。',
     specs:'サイズ：230×310mm / 厚み：40μ / 枚数：100枚 / 材質：OPP'},

    {id:'B012',name:'宅配ダンボール 60サイズ 20枚',price:2200,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['60サイズ','80サイズ'],stock:0,moq:5,
     desc:'丈夫な新品ダンボール。EC通販・引越し・保管に。',
     specs:'サイズ：W300×D230×H150mm（60サイズ）/ 素材：強化ダンボール / 枚数：20枚'},

    {id:'B013',name:'エアークッション ロール型',price:3300,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:1,
     desc:'割れ物・精密機器の保護に。その場で膨らませるロールタイプ。',
     specs:'サイズ：400mm幅 / 長さ：100m / 気泡：50×100mm / 対応機種：専用機またはエアポンプ'},

    {id:'B014',name:'梱包用OPPテープ 6巻セット',price:1540,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['50mm×100m'],stock:0,moq:5,
     desc:'強粘着・引き裂き性能に優れた梱包テープ。透明タイプで仕上がりきれい。',
     specs:'幅：50mm / 長さ：100m / 粘着力：強粘着 / セット：6巻'},

    {id:'B015',name:'プチプチ 気泡緩衝材 10m',price:1100,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['600mm幅','300mm幅'],stock:0,moq:3,
     desc:'標準品質の気泡緩衝材（プチプチ）。割れ物梱包の定番品。',
     specs:'幅：600mm / 長さ：10m / 気泡径：10mm / 素材：ポリエチレン'},

    {id:'B016',name:'ハニカム紙緩衝材 50m',price:3850,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['320mm幅'],stock:0,moq:1,
     desc:'エコフレンドリーな紙製緩衝材。包む・詰める・紙ヒモにもなる万能タイプ。',
     specs:'幅：320mm / 長さ：50m / 素材：クラフト紙 / 伸張率：最大300%'},

    {id:'B017',name:'ストレッチフィルム 400m',price:2640,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:2,
     desc:'パレット積みの固定や大型荷物の結束に。業務用大巻タイプ。',
     specs:'幅：500mm / 長さ：400m / 厚み：15μ / 芯径：76mm'},

    {id:'B018',name:'PPバンド 200m',price:1760,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f6c90e','#2c2c2c'],sizes:['15mm幅'],stock:0,moq:2,
     desc:'荷造り・段ボール結束に定番のPPバンド。専用バックルとセット。',
     specs:'幅：15mm / 長さ：200m / 素材：ポリプロピレン / バックル：100個付属'},

    {id:'B019',name:'業務用テープカッター 卓上型',price:2860,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'重量感ある業務用卓上テープカッター。50mm幅までのテープに対応。',
     specs:'対応テープ幅：最大50mm / 刃：ステンレス製 / 重量：350g / 素材：スチール+ABS'},

    {id:'B020',name:'宅配ビニール袋 100枚',price:1320,
     category:'packaging',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['A4','B4','A3'],stock:0,moq:5,
     desc:'防水性・耐久性に優れた宅配専用ポリ袋。テープ付き封入簡単タイプ。',
     specs:'サイズ：310×420mm（A4）/ 厚み：60μ / 枚数：100枚 / 封入：粘着テープ付'},

    // ── For Business — Industrial Products / 工業用品 ──
    {id:'B021',name:'プロ用工具セット 47点',price:18700,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#8b0000'],sizes:['FREE'],stock:0,moq:1,
     desc:'現場作業のプロが選ぶ47点フルセット。頑丈なケース付き。',
     specs:'内容：各種スパナ・ドライバー・ペンチ・レンチ等47点 / ケース：EVAフォームインサート付ハードケース'},

    {id:'B022',name:'電子部品アソートセット',price:5500,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'実務対応の電子部品セット。抵抗・コンデンサ・LED・ICソケット等。',
     specs:'内容：抵抗100種・コンデンサ50種・LED20種・IC等 / 収納：仕切り付きケース'},

    {id:'B023',name:'LANケーブル Cat6 10m',price:2200,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#1a6b3a','#2c2c2c','#f5f5f5'],sizes:['5m','10m','20m'],stock:0,moq:1,
     desc:'業務用高速Cat6ケーブル。ノイズ対策済みシールドタイプ。',
     specs:'規格：Cat6 / 速度：最大1Gbps / 長さ：10m / コネクタ：RJ-45 / 外径：6mm'},

    {id:'B024',name:'ナイロン結束バンド 200本入',price:880,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5','#2c2c2c'],sizes:['100mm','200mm','300mm'],stock:0,moq:5,
     desc:'耐候性ナイロン製結束バンド。配線整理・荷物固定に。',
     specs:'材質：ナイロン66 / 長さ：200mm / 幅：3.6mm / 耐荷重：18kg / 200本入'},

    {id:'B025',name:'絶縁テープセット 5色',price:1100,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#ff0000','#000000','#0000ff','#008000','#ffff00'],sizes:['FREE'],stock:0,moq:2,
     desc:'電気工事・配線識別に。耐熱・耐候性の高い絶縁ビニールテープ。',
     specs:'幅：19mm / 長さ：10m / 色：5色（赤・黒・青・緑・黄）/ 耐熱：80℃'},

    {id:'B026',name:'折りたたみ作業台 耐荷重150kg',price:12100,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'現場・倉庫で活躍する折りたたみ作業台。耐荷重150kg、軽量アルミ製。',
     specs:'天板：W900×D400mm / 高さ：820mm / 耐荷重：150kg / 材質：アルミ合金 / 重量：8kg'},

    {id:'B027',name:'充電式電動ドライバー',price:9900,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#1a3a6b'],sizes:['FREE'],stock:0,moq:1,
     desc:'軽量・コンパクトな充電式電動ドライバー。ビット16種類付属。',
     specs:'電圧：18V / トルク：最大25Nm / 回転数：0-1800rpm / バッテリー：2Ah / ビット：16種付'},

    {id:'B028',name:'コンベックス スタンダード 5.5m',price:1540,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#f6c90e'],sizes:['FREE'],stock:0,moq:1,
     desc:'プロ仕様の巻き尺。ゆっくり戻る安全機構付き。',
     specs:'測定範囲：5.5m / テープ幅：19mm / 目盛：mm・cm / ケース：ABS樹脂'},

        {id:'B029',name:'気動研削機（風研削ペン）',price:21970,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/b029_1.jpg','assets/images/b029_2.jpg','assets/images/b029_3.jpg','assets/images/b029_4.jpg','assets/images/b029_5.jpg','assets/images/b029_6.jpg'],
     colors:['#c0c0c0'],sizes:['FREE'],stock:50,moq:5,
     desc:'高トルク気動研削機（風動彫刻機/風研削ペン）。各種金属の精密研削・雕刻・研磨から塑料・石材・木材の切削まで幅広く対応。2.38mm・3mmコレット各1個と3mm軸砂輪磨頭10個付属。',
     specsList:[
       ['空載回転数','65,000 rpm'],
       ['把持能力','2.38mm / 3mm'],
       ['進気継手','1/4"'],
       ['エアーホース長','1.3m'],
       ['付属品','2.38mmコレット×1 / 3mmコレット×1 / 3mm軸砂輪磨頭×10'],
       ['産地','中国']
     ],
     delivery:'通常3〜7営業日以内に発送',
     returns:'商品到着後7日以内、未使用品に限り返品可'},

    {id:'B030',name:'工場備品管理キット',price:7700,
     category:'industrial',parentCat:'for-business',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'工場・倉庫の備品整理に。ラベルシール・棚番号プレート・管理台帳がセット。',
     specs:'内容：棚番号プレート50枚・ラベルシール100枚・インデックスカード50枚・収納ボックス2個'},

    // ── For Business — Safety & Workwear / 作業用品・安全用品 ──
    {id:'B031',name:'耐切創手袋 Level5（1双）',price:499,
     category:'safety-workwear',parentCat:'for-business',
     images:['assets/images/b031_1.jpg','assets/images/b031_2.jpg','assets/images/b031_3.jpg','assets/images/b031_4.jpg','assets/images/b031_5.jpg','assets/images/b031_6.jpg','assets/images/b031_7.jpg','assets/images/b031_8.jpg','assets/images/b031_9.jpg','assets/images/b031_10.jpg'],
     colorOptions:[
       {name:'黒',       hex:'#2c2c2c', imgIndex:0},
       {name:'紫',       hex:'#6b21a8', imgIndex:2},
       {name:'グレー',   hex:'#808080', imgIndex:4},
       {name:'ブルー',   hex:'#1a3a6b', imgIndex:6},
       {name:'イエロー', hex:'#f6c90e', imgIndex:8}
     ],
     colors:['#2c2c2c','#6b21a8','#808080','#1a3a6b','#f6c90e'],
     sizes:['XS','S','M','L'],stock:500,moq:10,
     desc:'切断防止手袋 労働保護レベル5。耐摩耗・防切創、5級防切創標識付き、独立包装。建設現場・工場作業に最適な滑り止め機能付き厚手耐摩耗性手袋。OEM対応可。',
     specsList:[
       ['素材','HPPE'],
       ['耐切創レベル','Level 5'],
       ['産地','中国'],
       ['包装','独立包装'],
       ['カラー','黒 / 紫 / グレー / ブルー / イエロー'],
       ['OEM','対応可']
     ],
     sizeChart:{
       headers:['サイズ','長さ(cm)','幅(cm)','重量(g)','対象'],
       rows:[
         ['XS','23.0','10.0','45','ビッグキッズ'],
         ['S','23.0','10.0','45','女性用フリー'],
         ['M','23.0','10.0','45','男女兼用M'],
         ['L','23.0','10.0','45','メンズフリー']
       ]
     }},

    {id:'B032',name:'多機能ワークベルト',price:1399,
     category:'safety-workwear',parentCat:'for-business',
     images:['assets/images/b032_1.jpg','assets/images/b032_2.jpg','assets/images/b032_3.jpg','assets/images/b032_4.jpg'],
     colorOptions:[
       {name:'ブラック', hex:'#2c2c2c', imgIndex:0},
       {name:'カーキ',   hex:'#8b7355', imgIndex:1},
       {name:'ミリタリーグリーン', hex:'#4a5e3a', imgIndex:2}
     ],
     colors:['#2c2c2c','#8b7355','#4a5e3a'],
     sizes:['FREE'],stock:300,moq:3,
     desc:'工場・建設現場向け多機能腰ベルト。丈夫なオックスフォード布本体と樹脂バックル採用。調節可能で幅広い体型に対応。',
     specsList:[
       ['素材（本体）','オックスフォード布'],
       ['素材（バックル）','樹脂'],
       ['本体サイズ','69〜139cm × 5cm'],
       ['バックル','7cm × 6cm'],
       ['重量','172g'],
       ['産地','中国']
     ]},

    {id:'B037',name:'企業向けポロシャツ（カスタム）',price:0,madeToOrder:true,
     category:'safety-workwear',parentCat:'for-business',
     images:['assets/images/b037_1.jpg','assets/images/b037_2.jpg'],
     colorOptions:[
       {name:'ブラック', hex:'#2c2c2c', imgIndex:0},
       {name:'ネイビー', hex:'#1a3a6b', imgIndex:1}
     ],
     colors:['#2c2c2c','#1a3a6b'],
     sizes:['S','M','L','XL','2XL','3XL','4XL','5XL','6XL','7XL'],stock:999,moq:10,
     desc:'企業・工場向けカスタムポロシャツ。100%綿素材で通気性・伸縮性に優れ快適な着心地。ロゴ印刷は4種の加工に対応：シルクスクリーン印刷・刺繍・デジタルダイレクト印刷・ホットプレス転写。胸ポケット付き。受注生産品のため価格はお問い合わせください。',
     specsList:[
       ['素材','綿100%'],
       ['産地','中国'],
       ['ロゴ加工','シルクスクリーン印刷 / 刺繍 / デジタル直噴 / ホットプレス転写'],
       ['特徴','通気・快適・伸縮性'],
       ['種別','受注生産品']
     ],
     sizeChart:{
       headers:['サイズ','胸囲1/2(cm)','着丈(cm)','肩幅(cm)','袖丈(cm)','推奨身長(cm)'],
       rows:[
         ['S','46','64','40.5','18.4','150-155'],
         ['M','48','66','42','19','155-160'],
         ['L','50','68','43','19.7','160-165'],
         ['XL','52','70','44','20.3','165-170'],
         ['2XL','54','72','45.5','21','170-175'],
         ['3XL','56','74','47','21.6','175-180'],
         ['4XL','58','76','48','22.3','180-185'],
         ['5XL','60','78','49','22.9','185-190'],
         ['6XL','62','80','50.5','23.6','190-195'],
         ['7XL','64','82','52','24.2','195-200']
       ]
     }},

    {id:'B039',name:'薄手作業服セット（上下）',price:6999,
     category:'safety-workwear',parentCat:'for-business',
     images:['assets/images/b039_1.jpg','assets/images/b039_2.jpg','assets/images/b039_3.jpg','assets/images/b039_4.jpg','assets/images/b039_5.jpg','assets/images/b039_6.jpg','assets/images/b039_7.jpg','assets/images/b039_8.jpg','assets/images/b039_9.jpg'],
     colorOptions:[
       {name:'カーキ',   hex:'#8b7355', imgIndex:0},
       {name:'ネイビー', hex:'#1a3a6b', imgIndex:4}
     ],
     colors:['#8b7355','#1a3a6b'],
     sizes:['165','170','175','180','185','190','195'],stock:200,moq:5,
     desc:'薄手耐摩耗性溶接作業服セット（上下）。股部補強・高輝度反射テープ付きで安全性抜群。吸汗速乾・耐摩耗・防汚・耐熱・柔軟肌触り。胸口ジッパーポケット（ペン収納可）。',
     specsList:[
       ['素材','コットン'],
       ['スタイル','上下セット'],
       ['産地','中国'],
       ['特徴','吸汗速乾 / 耐摩耗 / 防汚 / 耐熱 / 反射テープ付き']
     ],
     sizeChart:{
       headers:['サイズ','対応身長(cm)','胸囲(cm)'],
       rows:[
         ['165','160-166','106'],
         ['170','167-172','110'],
         ['175','173-177','114'],
         ['180','178-180','118'],
         ['185','180-185','122'],
         ['190','185-190','126'],
         ['195','190-193','130']
       ]
     }},

    {id:'B040',name:'反射ベスト 高視認性',price:1499,
     category:'safety-workwear',parentCat:'for-business',
     images:['assets/images/b040_1.jpg','assets/images/b040_2.jpg','assets/images/b040_3.jpg','assets/images/b040_4.jpg','assets/images/b040_5.jpg','assets/images/b040_6.jpg','assets/images/b040_7.jpg'],
     colorOptions:[
       {name:'蛍光イエロー', hex:'#f6c90e', imgIndex:0},
       {name:'グレー',       hex:'#808080', imgIndex:3},
       {name:'オレンジ',     hex:'#ff7f00', imgIndex:5}
     ],
     colors:['#f6c90e','#808080','#ff7f00'],
     sizes:['L','XL','XXL','XXXL'],stock:200,moq:5,
     desc:'反射ベスト ポケット付き。施工・環境衛生・園林・建築・夜間交通誘導に対応。ナイロン120g針布素材で軽量丈夫。高反射テープで夜間視認性を確保。',
     specsList:[
       ['素材','ナイロン / 120g針布'],
       ['産地','中国'],
       ['用途','施工 / 環境衛生 / 園林 / 建築 / 夜間交通誘導']
     ],
     sizeChart:{
       headers:['サイズ','胸囲(cm)','着丈(cm)','推奨体重'],
       rows:[
         ['L','56','67','50kg以下'],
         ['XL','58','68','50〜85kg'],
         ['XXL','60','70','85〜100kg'],
         ['XXXL','64','70','100kg以上']
       ]
     }},

    // ══════════════════════════════════════════════════════
    // FOR LIFE — Home & Living / 生活雑貨
    // ══════════════════════════════════════════════════════
    {id:'L001',name:'天然竹製 収納ボックス 3点セット',price:5500,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['FREE'],stock:0,moq:1,
     desc:'天然竹素材の環境に優しい収納ボックス。大・中・小3サイズセット。',
     specs:'素材：天然竹 / サイズ：L300×200×H150mm / M250×170×H120mm / S200×130×H100mm'},

    {id:'L002',name:'スチール ハンガーラック 幅90cm',price:8800,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#f5f5f5'],sizes:['FREE'],stock:0,moq:1,
     desc:'耐荷重50kgのスチール製ハンガーラック。キャスター付きで移動も楽々。',
     specs:'素材：スチール / サイズ：W900×D450×H1600mm（可変）/ 耐荷重：50kg / キャスター付'},

    {id:'L003',name:'コードレス掃除機 軽量2.1kg',price:29800,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5','#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'わずか2.1kgの超軽量コードレス掃除機。連続使用40分・強力吸引力。',
     specs:'重量：2.1kg / 連続使用：40分 / 吸引力：25kPa / バッテリー：リチウムイオン / 集塵：0.6L'},

    {id:'L004',name:'マイクロファイバー モップセット',price:3300,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:1,
     desc:'超極細繊維で微細なホコリも拭き取るモップセット。伸縮ポール付き。',
     specs:'ポール：伸縮式90〜130cm / 拭き幅：30cm / ヘッド：マイクロファイバー交換式 / 水洗い可'},

    {id:'L005',name:'ラタン 収納バスケット 3点セット',price:7700,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['FREE'],stock:0,moq:1,
     desc:'天然ラタン素材のおしゃれな収納バスケット。大・中・小3サイズ。',
     specs:'素材：天然ラタン / サイズ：L400×300×H220mm / M350×260×H190mm / S300×210×H160mm'},

    {id:'L006',name:'ポスターフレーム A2 ブラック',price:4400,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#f5f5f5'],sizes:['A2','A3'],stock:0,moq:1,
     desc:'シンプルでインテリアに馴染むアルミ製ポスターフレーム。壁掛け・自立両用。',
     specs:'素材：アルミ / 対応サイズ：A2（420×594mm）/ 厚み：18mm / 裏板：MDF'},

    {id:'L007',name:'ソイ アロマキャンドル 3点セット',price:5500,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f0e8'],sizes:['FREE'],stock:0,moq:1,
     desc:'天然大豆由来のソイワックスキャンドル。ラベンダー・シダーウッド・ベルガモット。',
     specs:'素材：大豆ワックス / 容量：各180ml / 燃焼：約40時間 / 香り：3種セット'},

    {id:'L008',name:'ベルギーリネン カーテン 2枚組',price:12100,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f0e8','#d4b896','#808080'],sizes:['100×178cm','100×200cm','100×240cm'],stock:0,moq:1,
     desc:'ベルギー産リネン100%のナチュラルカーテン。光を柔らかく通す遮熱仕様。',
     specs:'素材：リネン100% / サイズ：幅100×丈178cm（2枚組）/ 洗濯：手洗い可 / フック：アジャスター付'},

    {id:'L009',name:'ウォールミラー 丸型 60cm',price:9900,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#d4b896'],sizes:['FREE'],stock:0,moq:1,
     desc:'直径60cmの大きめウォールミラー。ゴールドフレームが空間をエレガントに。',
     specs:'直径：600mm / フレーム：スチール（ゴールドまたはブラック）/ 壁掛け金具付属'},

    {id:'L010',name:'天然木 壁掛け時計',price:7700,
     category:'home-living',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['FREE'],stock:0,moq:1,
     desc:'無垢材を使用した職人手作りのウォールクロック。静音スイープムーブメント。',
     specs:'素材：ウォールナット無垢材 / 直径：300mm / ムーブメント：静音スイープ / 電池：AA×1'},

    // ── For Life — Kitchen / キッチン用品 ──
    {id:'L011',name:'耐熱ガラス保存容器 6点セット',price:6600,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:1,
     desc:'電子レンジ・冷凍庫対応の耐熱ガラス製保存容器。液漏れしにくいロック蓋。',
     specs:'素材：ホウケイ酸ガラス / 内容量：200ml×2・500ml×2・1000ml×2 / 電子レンジ可 / 食洗機可'},

    {id:'L012',name:'ステンレス 調理器具セット 8点',price:8800,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#c0c0c0'],sizes:['FREE'],stock:0,moq:1,
     desc:'18/8ステンレス製の高耐久調理器具セット。お手入れ簡単で衛生的。',
     specs:'素材：18/8ステンレス / 内容：フライ返し・おたま・スパチュラ・泡立て器など8点 / 食洗機可'},

    {id:'L013',name:'伸縮式 キッチン収納ラック',price:5500,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#c0c0c0'],sizes:['FREE'],stock:0,moq:1,
     desc:'幅が調節できる伸縮式キッチンラック。鍋・フライパン・食器を縦置き収納。',
     specs:'素材：スチール / 幅：伸縮式240〜420mm / 高さ：220mm / 耐荷重：5kg'},

    {id:'L014',name:'天然竹製 まな板 大・中 2枚組',price:4400,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#d4b896'],sizes:['FREE'],stock:0,moq:1,
     desc:'抗菌性に優れた天然竹素材のまな板2枚セット。肉用・野菜用で使い分けに。',
     specs:'素材：天然竹 / 大：W400×D260×H15mm / 中：W330×D210×H15mm / 滑り止め付'},

    {id:'L015',name:'鋳鉄ホーロー鍋 22cm',price:18700,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#8b0000','#2c2c2c','#f5f0e8'],sizes:['20cm','22cm','24cm'],stock:0,moq:1,
     desc:'均一な熱伝導と高い蓄熱性を誇る鋳鉄ホーロー鍋。煮込み・揚げ・蒸しに万能。',
     specs:'素材：鋳鉄・ホーロー加工 / 容量：3.0L（22cm）/ IH・ガス・オーブン対応 / 重量：3.8kg'},

    {id:'L016',name:'白磁 食器セット 4人用',price:14300,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:1,
     desc:'純白の白磁食器セット。ディナープレート・サラダボウル・マグカップ各4客。',
     specs:'素材：白磁 / 内容：各4客（計12点）/ 電子レンジ可 / 食洗機可 / 産地：美濃焼'},

    {id:'L017',name:'セルロース スポンジ 6個セット',price:1540,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f6c90e','#ff7070','#69d2e7'],sizes:['FREE'],stock:0,moq:2,
     desc:'天然セルロース素材のエコスポンジ。吸水性抜群で洗いやすくすぐ乾く。',
     specs:'素材：セルロース・ポリエステル / サイズ：100×70×30mm / 枚数：6個 / 生分解性'},

    {id:'L018',name:'ステンレス 水切りラック',price:6600,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#c0c0c0'],sizes:['FREE'],stock:0,moq:1,
     desc:'錆びにくい18/8ステンレス製水切りラック。食器・グラス・カトラリー一緒に収納。',
     specs:'素材：18/8ステンレス / サイズ：W400×D320×H240mm / トレー：シリコン付 / 食洗機可'},

    {id:'L019',name:'回転 調味料ラック 5連',price:3850,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#c0c0c0'],sizes:['FREE'],stock:0,moq:1,
     desc:'360度回転するステンレス製5連調味料ラック。作業台をスッキリ整頓。',
     specs:'素材：ステンレス / 収容本数：5本 / 回転：360° / 対応瓶：直径60mm以下'},

    {id:'L020',name:'シリコン ヘラ＆スパチュラ 6点セット',price:2860,
     category:'kitchen',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#ff7070','#f5f0e8'],sizes:['FREE'],stock:0,moq:1,
     desc:'耐熱230℃のシリコン製ヘラ・スパチュラ6点セット。ステンレス柄一体型。',
     specs:'素材：シリコン＋ステンレス / 耐熱：230℃ / 内容：6点 / 食洗機可'},

    // ── For Life — Travel & Outdoor / トラベル・アウトドア ──
    {id:'L021',name:'トラベルポーチ 6点セット',price:4400,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#1a3a6b','#8b0000'],sizes:['FREE'],stock:0,moq:1,
     desc:'スーツケースを整頓する6点トラベルポーチセット。防水素材使用。',
     specs:'素材：防水ナイロン / 内容：6サイズ（XL・L・M・S・靴袋・洗面袋）'},

    {id:'L022',name:'超軽量 折りたたみバッグ 25L',price:2860,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#1a3a6b'],sizes:['FREE'],stock:0,moq:1,
     desc:'重量わずか180gの超軽量折りたたみバッグ。手のひらサイズに収納可能。',
     specs:'容量：25L / 重量：180g / 素材：リップストップナイロン / 耐荷重：15kg'},

    {id:'L023',name:'チタンクッカーセット 4点',price:8800,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#c0c0c0'],sizes:['FREE'],stock:0,moq:1,
     desc:'軽量かつ強靭なチタン製クッカーセット。登山・キャンプ・バックパッカーに。',
     specs:'素材：純チタン / 内容：鍋600ml・ポット1000ml・フタ兼フライパン・袋 / 総重量：280g'},

    {id:'L024',name:'低反発 トラベルピロー U型',price:3300,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#808080'],sizes:['FREE'],stock:0,moq:1,
     desc:'低反発ウレタン素材のトラベルネックピロー。携帯ケース付き。',
     specs:'素材：低反発ウレタン / サイズ：W310×D140×H100mm（展開時）/ 収納袋付き'},

    {id:'L025',name:'旅行用 圧縮袋 8枚セット',price:2200,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:2,
     desc:'衣類を圧縮してスーツケースをスッキリ。手で押さえるだけの簡単圧縮。',
     specs:'内容：L×2・M×3・S×3 / 素材：ナイロン+PVC / 圧縮率：最大60% / 防水対応'},

    {id:'L026',name:'本革 ネームタグ 2個組',price:1980,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#8b4513','#2c2c2c'],sizes:['FREE'],stock:0,moq:1,
     desc:'本革製の高級ラゲージタグ。個人情報保護用ウィンドウ付き。',
     specs:'素材：本革 / サイズ：W95×H65mm / 固定：PP製ベルト / 2個セット'},

    {id:'L027',name:'TSA対応 トラベルボトルセット 8本',price:2750,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#f5f5f5'],sizes:['FREE'],stock:0,moq:1,
     desc:'機内持込対応の液体ボトルセット。クリアポーチ付き。',
     specs:'内容：ボトル30ml×4・50ml×2・80ml×1・詰め替え容器×1 / 材質：LDPE / TSA対応'},

    {id:'L028',name:'軽量コンパクトチェア',price:12100,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#1a3a6b'],sizes:['FREE'],stock:0,moq:1,
     desc:'重量1.2kgの超軽量チェア。耐荷重120kg、組立て・収納が簡単。',
     specs:'重量：1.2kg / 耐荷重：120kg / フレーム：アルミ合金 / 収納：W44×D14×H14cm'},

    {id:'L029',name:'LED ランタン 充電式',price:5500,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#2c2c2c','#f5f0e8'],sizes:['FREE'],stock:0,moq:1,
     desc:'充電式LEDランタン。最大500ルーメン、連続点灯8〜100時間。',
     specs:'明るさ：最大500lm / 連続点灯：8〜100h / 充電：USB-C / 防水：IPX5 / 重量：320g'},

    {id:'L030',name:'真空断熱 ウォーターボトル 1L',price:4400,
     category:'travel-outdoor',parentCat:'for-life',
     images:['assets/images/soldout.jpg'],colors:['#c0c0c0','#2c2c2c','#1a3a6b','#8b0000'],sizes:['FREE'],stock:0,moq:1,
     desc:'12時間保温・24時間保冷の真空断熱ボトル。一口飲みキャップ付き。',
     specs:'容量：1L / 保温：12時間 / 保冷：24時間 / 素材：18/8ステンレス / 重量：380g'},

    // ══════════════════════════════════════════════════════
    // PET SUPPLIES — Dog / 犬用品
    // ══════════════════════════════════════════════════════
    {id:'P001',name:'ホリスティック ドッグフード 3kg',price:5500,
     category:'dog',parentCat:'pet',
     images:imgs('p001'),colors:['#d4b896'],sizes:['3kg','6kg'],stock:30,moq:1,
     desc:'グレインフリー・無添加のプレミアムドッグフード。全犬種・全年齢対応。',
     specs:'内容量：3kg / 原料：チキン70%・野菜・ビタミン / 対象：全犬種 / 保存：直射日光を避け保存'},

    {id:'P002',name:'メモリーフォーム ドッグベッド M',price:9900,
     category:'dog',parentCat:'pet',
     images:imgs('p002'),colors:['#d4b896','#808080'],sizes:['S','M','L'],stock:15,moq:1,
     desc:'体圧分散に優れたメモリーフォーム犬用ベッド。洗えるカバー付き。',
     specs:'サイズ：W700×D550×H80mm（M）/ 素材：メモリーフォーム / カバー：洗濯機可'},

    {id:'P003',name:'本革 ハーネス＆リードセット',price:8800,
     category:'dog',parentCat:'pet',
     images:imgs('p003'),colors:['#8b4513','#2c2c2c'],sizes:['S','M','L'],stock:20,moq:1,
     desc:'本革製の高級ハーネスとリードのセット。金具はステンレス製で錆びにくい。',
     specs:'素材：本革 / 金具：ステンレス / リード長：120cm / サイズ：S/M/L（バックル調節可）'},

    {id:'P004',name:'天然成分 犬用シャンプー 500ml',price:2860,
     category:'dog',parentCat:'pet',
     images:imgs('p004'),colors:['#f5f0e8'],sizes:['FREE'],stock:50,moq:1,
     desc:'敏感肌対応・無添加の犬用シャンプー。アロエベラ・ラベンダー配合。',
     specs:'容量：500ml / 成分：天然植物由来 / 無添加：硫酸塩・パラベンフリー / 全犬種対応'},

    {id:'P005',name:'インタラクティブ おもちゃ 5点セット',price:4400,
     category:'dog',parentCat:'pet',
     images:imgs('p005'),colors:['#ff7f00'],sizes:['FREE'],stock:25,moq:1,
     desc:'知的好奇心を刺激するインタラクティブおもちゃセット。ストレス発散・知育に。',
     specs:'内容：5点セット / 素材：天然ゴム・PP / 対象：中型犬以下 / 安全試験：ASTM F963準拠'},

    {id:'P006',name:'ステンレス 犬用食器セット',price:3300,
     category:'dog',parentCat:'pet',
     images:imgs('p006'),colors:['#c0c0c0'],sizes:['FREE'],stock:40,moq:1,
     desc:'衛生的なステンレス製犬用食器2点セット。滑り止めシリコンベース付き。',
     specs:'素材：18/8ステンレス / 容量：各500ml / 台座：シリコン / 食洗機可'},

    {id:'P007',name:'チキン風味 犬用おやつ 200g',price:1540,
     category:'dog',parentCat:'pet',
     images:imgs('p007'),colors:['#d4b896'],sizes:['FREE'],stock:100,moq:2,
     desc:'国産チキン100%使用の犬用トリーツ。無添加・無着色。歯磨き効果あり。',
     specs:'内容量：200g / 原料：国産チキン100% / 添加物なし / カロリー：約320kcal/100g'},

    {id:'P008',name:'充電式 電動ネイルグラインダー',price:4950,
     category:'dog',parentCat:'pet',
     images:imgs('p008'),colors:['#f5f5f5','#ff7070'],sizes:['FREE'],stock:18,moq:1,
     desc:'低振動・静音設計の充電式爪グラインダー。犬猫両用・小中大型犬対応。',
     specs:'回転数：3段階（250/320/400rpm）/ 充電：USB / 動作時間：60min / 重量：120g'},

    {id:'P009',name:'防水 犬用レインコート',price:3850,
     category:'dog',parentCat:'pet',
     images:imgs('p009'),colors:['#f6c90e','#ff7070','#1a6b3a'],sizes:['XS','S','M','L','XL'],stock:30,moq:1,
     desc:'完全防水の犬用レインコート。反射テープ付きで夜間散歩も安全。',
     specs:'素材：防水ナイロン / 反射テープ：あり / サイズ：XS〜XL / 装着：マジックテープ'},

    {id:'P010',name:'航空機対応 ペットキャリーバッグ',price:15400,
     category:'dog',parentCat:'pet',
     images:imgs('p010'),colors:['#2c2c2c'],sizes:['FREE'],stock:8,moq:1,
     desc:'国際線機内持込サイズ対応のソフトキャリーバッグ。通気性抜群。',
     specs:'サイズ：W400×D280×H230mm / 素材：防水オックスフォード / 最大積載：5kg / 機内持込対応'},

    // ── Pet — Cat / 猫用品 ──
    {id:'P011',name:'グレインフリー キャットフード 2kg',price:4400,
     category:'cat',parentCat:'pet',
     images:imgs('p011'),colors:['#d4b896'],sizes:['2kg','4kg'],stock:35,moq:1,
     desc:'穀物不使用・高タンパクの猫用ドライフード。サーモン＆チキン配合。',
     specs:'内容量：2kg / 主原料：チキン60%・サーモン20% / 対象：全猫種・成猫 / 保存：冷暗所'},

    {id:'P012',name:'麻縄巻き キャットタワー 160cm',price:22000,
     category:'cat',parentCat:'pet',
     images:imgs('p012'),colors:['#d4b896','#808080'],sizes:['FREE'],stock:6,moq:1,
     desc:'天然麻縄・フランネル素材のキャットタワー。3段構造で複数猫も安心。',
     specs:'高さ：160cm / 台座：W500×D500mm / 耐荷重：25kg / 素材：麻縄・フランネル'},

    {id:'P013',name:'猫用 オーソペディックベッド',price:8800,
     category:'cat',parentCat:'pet',
     images:imgs('p013'),colors:['#d4b896','#808080'],sizes:['FREE'],stock:12,moq:1,
     desc:'関節に優しいメモリーフォームの猫用ベッド。洗えるカバー付き。',
     specs:'サイズ：W550×D450×H150mm / 素材：メモリーフォーム / カバー：洗濯機可'},

    {id:'P014',name:'自動 フェザーワンド おもちゃセット',price:3850,
     category:'cat',parentCat:'pet',
     images:imgs('p014'),colors:['#ff7f00'],sizes:['FREE'],stock:30,moq:1,
     desc:'電動回転する自動フェザーワンド。手ぶら遊ばせ可能。替えフェザー3本付き。',
     specs:'動作：電動回転 / 電源：単4×2本 / 速度：3段階 / 替えフェザー：3本付'},

    {id:'P015',name:'陶器 猫用食器セット 2点',price:4400,
     category:'cat',parentCat:'pet',
     images:imgs('p015'),colors:['#f5f5f5','#d4b896'],sizes:['FREE'],stock:25,moq:1,
     desc:'ヒゲが当たらない浅型デザインの陶器製猫用食器。洗いやすく衛生的。',
     specs:'素材：陶器 / 直径：各160mm / 深さ：40mm / 電子レンジ可 / 食洗機可'},

    {id:'P016',name:'天然鉱物 猫砂 10L',price:2200,
     category:'cat',parentCat:'pet',
     images:imgs('p016'),colors:['#f5f5f5'],sizes:['10L','20L'],stock:60,moq:2,
     desc:'素早く固まる天然鉱物系猫砂。においを素早く吸収・消臭。',
     specs:'容量：10L / 重量：約9kg / 粒サイズ：中粒2mm / 固まり：素早い凝集タイプ'},

    {id:'P017',name:'サイザル麻 爪とぎポスト 60cm',price:3300,
     category:'cat',parentCat:'pet',
     images:imgs('p017'),colors:['#d4b896'],sizes:['FREE'],stock:35,moq:1,
     desc:'天然サイザル麻巻きの爪とぎポスト。安定感のある重量ベース付き。',
     specs:'高さ：60cm / 素材：サイザル麻・天然木 / 台座：W380×D380mm / 耐荷重：10kg'},

    {id:'P018',name:'天然成分 猫用シャンプー 300ml',price:2640,
     category:'cat',parentCat:'pet',
     images:imgs('p018'),colors:['#f5f0e8'],sizes:['FREE'],stock:45,moq:1,
     desc:'敏感肌対応・無添加の猫用シャンプー。アロエベラ配合で被毛つやつや。',
     specs:'容量：300ml / 成分：天然植物由来 / 無添加：硫酸塩・パラベンフリー'},

    {id:'P019',name:'まぐろ風味 猫用おやつ 60g',price:880,
     category:'cat',parentCat:'pet',
     images:imgs('p019'),colors:['#ff7f00'],sizes:['FREE'],stock:150,moq:3,
     desc:'国産まぐろ使用の猫用トリーツ。歯磨き効果・タウリン補給に。',
     specs:'内容量：60g / 主原料：国産まぐろ / カロリー：約280kcal/100g'},

    {id:'P020',name:'ハードケース 猫用キャリー',price:12100,
     category:'cat',parentCat:'pet',
     images:imgs('p020'),colors:['#f5f5f5'],sizes:['FREE'],stock:10,moq:1,
     desc:'頑丈なハードケース猫用キャリー。通院・旅行・緊急時に。',
     specs:'サイズ：W520×D350×H340mm / 素材：ABS樹脂 / 最大積載：6kg / 上下開閉可'},

    // ── Pet — Care / ケア用品 ──
    {id:'P021',name:'コードレス ペット用バリカン',price:6600,
     category:'pet-care',parentCat:'pet',
     images:imgs('p021'),colors:['#f5f5f5'],sizes:['FREE'],stock:20,moq:1,
     desc:'低騒音・低振動の充電式ペット用バリカン。アタッチメント4種付き。',
     specs:'騒音：50dB以下 / 充電：USB / 動作時間：90min / ブレード：ステンレス / アタッチメント：4種'},

    {id:'P022',name:'スリッカー＆コーム ブラシセット',price:2200,
     category:'pet-care',parentCat:'pet',
     images:imgs('p022'),colors:['#d4b896'],sizes:['FREE'],stock:50,moq:1,
     desc:'スリッカーブラシとファインコームのセット。抜け毛・もつれに効果的。',
     specs:'内容：スリッカーブラシ×1・ファインコーム×1 / 素材：ステンレス・木製ハンドル'},

    {id:'P023',name:'指サック式 ペット用歯ブラシ 6本',price:1320,
     category:'pet-care',parentCat:'pet',
     images:imgs('p023'),colors:['#f5f5f5'],sizes:['FREE'],stock:80,moq:2,
     desc:'指に装着するシリコン製歯ブラシ。犬猫の歯磨き・口腔ケアに。',
     specs:'素材：シリコン / サイズ：フリー（指サックタイプ）/ 本数：6本入 / 滅菌処理済'},

    {id:'P024',name:'ペット用 点眼補助ツール＋目薬',price:1980,
     category:'pet-care',parentCat:'pet',
     images:imgs('p024'),colors:['#f5f5f5'],sizes:['FREE'],stock:40,moq:1,
     desc:'目薬の正確な点眼を補助するツール付き。無香・防腐剤フリーの目薬セット。',
     specs:'内容：点眼補助器×1・目薬10ml×1 / 成分：塩化ナトリウム・ヒアルロン酸'},

    {id:'P025',name:'天然成分 消臭スプレー 500ml',price:2200,
     category:'pet-care',parentCat:'pet',
     images:imgs('p025'),colors:['#f5f0e8'],sizes:['FREE'],stock:60,moq:2,
     desc:'天然植物由来成分のペット専用消臭スプレー。床・ソファ・布製品に安全。',
     specs:'容量：500ml / 成分：天然植物エキス / ペットが舐めても安全 / 詰め替え可'},

    {id:'P026',name:'ペット用 厚手ウェットシート 80枚',price:1540,
     category:'pet-care',parentCat:'pet',
     images:imgs('p026'),colors:['#f5f5f5'],sizes:['FREE'],stock:100,moq:3,
     desc:'肌に優しい無香料・アルコールフリーのペット用ウェットシート。',
     specs:'内容量：80枚 / 素材：コットン100% / 無添加：アルコール・パラベンフリー / サイズ：200×150mm'},

    {id:'P027',name:'ギロチン式 爪切り＋ヤスリ セット',price:2860,
     category:'pet-care',parentCat:'pet',
     images:imgs('p027'),colors:['#f5f5f5'],sizes:['FREE'],stock:45,moq:1,
     desc:'切れ味持続のギロチン式爪切りとステンレスヤスリのセット。安全ストッパー付き。',
     specs:'素材：ステンレス刃 / ストッパー：あり / ヤスリ：ステンレス製 / 対象：犬猫'},

    {id:'P028',name:'ペット用 耳洗浄液 100ml',price:1760,
     category:'pet-care',parentCat:'pet',
     images:imgs('p028'),colors:['#f5f0e8'],sizes:['FREE'],stock:55,moq:1,
     desc:'耳垢・分泌物を優しく洗浄。獣医師監修の天然成分配合。',
     specs:'容量：100ml / 成分：天然植物由来 / 無添加：アルコール・着色料フリー / 使用方法：週1〜2回'},

    {id:'P029',name:'グルコサミン サプリメント 60粒',price:3850,
     category:'pet-care',parentCat:'pet',
     images:imgs('p029'),colors:['#d4b896'],sizes:['FREE'],stock:25,moq:1,
     desc:'関節ケアに特化したグルコサミン＆コンドロイチン配合サプリ。チキン風味。',
     specs:'内容量：60粒（30日分）/ 成分：グルコサミン・コンドロイチン・オメガ3 / 対象：犬猫'},

    {id:'P030',name:'デジタル ペット用体重計',price:5500,
     category:'pet-care',parentCat:'pet',
     images:imgs('p030'),colors:['#f5f5f5'],sizes:['FREE'],stock:15,moq:1,
     desc:'最小10g単位で計量できるペット用デジタル体重計。目盛りは大型LCD表示。',
     specs:'最大計量：30kg / 精度：±10g / 表示：LCD / 電源：単4×2本 / 天板：ペット用滑り止め'},

    // ── Pet — Toys / おもちゃ ──
    {id:'P031',name:'天然コットン ロープトイ 5点セット',price:2860,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p031'),colors:['#ff7070','#1a6b3a'],sizes:['FREE'],stock:60,moq:1,
     desc:'天然コットン100%のロープトイ5点セット。歯磨き効果と知育効果を兼ね備える。',
     specs:'素材：コットン100% / 内容：5種類（リング・骨型等）/ 対象：中型犬以下'},

    {id:'P032',name:'天然ゴム ボールセット 4個',price:2200,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p032'),colors:['#ff7f00','#1a6b3a','#ff7070'],sizes:['S','M','L'],stock:80,moq:1,
     desc:'弾みが良く丈夫な天然ゴム製犬用ボール4個セット。中に小型ボール内蔵。',
     specs:'素材：天然ゴム / サイズ：S60mm / M75mm / L90mm / セット：4個'},

    {id:'P033',name:'知育パズル フードトイ 犬用',price:4400,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p033'),colors:['#ff7f00'],sizes:['FREE'],stock:25,moq:1,
     desc:'おやつを隠して遊ぶ3ステップ知育パズル。分離不安・退屈対策に。',
     specs:'素材：ABS樹脂 / レベル：3段階 / 難易度：初級〜中級 / 対象：全犬種 / 食洗機可'},

    {id:'P034',name:'自動フェザーワンド 猫用 電動',price:3850,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p034'),colors:['#ff7f00'],sizes:['FREE'],stock:20,moq:1,
     desc:'自動で動くフェザーワンド。360度回転で猫の狩猟本能を刺激。',
     specs:'動作：電動360°回転 / 電源：単3×2本 / 速度：2段階 / 替えフェザー付'},

    {id:'P035',name:'電動 インタラクティブ ボール',price:5500,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p035'),colors:['#ff7f00','#f5f5f5'],sizes:['FREE'],stock:15,moq:1,
     desc:'不規則に動く電動ボール。犬猫の運動不足解消・知育に最適。',
     specs:'直径：75mm / 電源：USB充電（内蔵バッテリー）/ 動作：不規則自動回転 / 防水：IPX5'},

    {id:'P036',name:'天然ゴム 噛みごたえトイ',price:1980,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p036'),colors:['#2c2c2c','#ff7f00'],sizes:['S','M','L'],stock:70,moq:1,
     desc:'頑丈な天然ゴム製噛みごたえおもちゃ。おやつを詰めて遊べる。',
     specs:'素材：天然ゴム / サイズ：S55mm / M70mm / L85mm / 耐噛み強度：高'},

    {id:'P037',name:'ポップアップ トンネル おもちゃ',price:3300,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p037'),colors:['#808080'],sizes:['FREE'],stock:30,moq:1,
     desc:'折りたたみ可能な3穴トンネル。猫・小型犬の室内遊びに。',
     specs:'直径：30cm / 長さ：100cm×3連 / 素材：ポリエステル・スチールフレーム / 収納袋付'},

    {id:'P038',name:'自動 レーザーポインター 猫用',price:4950,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p038'),colors:['#f5f5f5'],sizes:['FREE'],stock:18,moq:1,
     desc:'自動回転する猫用レーザーポインター。自動オフ機能で安全設計。',
     specs:'電源：単4×3本 / 速度：3段階 / 自動オフ：15分後 / 角度：270°回転 / 安全：クラス1レーザー'},

    {id:'P039',name:'オーガニックコットン ぬいぐるみセット',price:3300,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p039'),colors:['#d4b896','#ff7070'],sizes:['FREE'],stock:35,moq:1,
     desc:'オーガニックコットン製の安全なぬいぐるみ3点セット。犬猫向け。',
     specs:'素材：オーガニックコットン / 内容：3種（小動物・鳥・魚）/ 内蔵：キャットニップ（猫用）'},

    {id:'P040',name:'有機キャットニップ おもちゃ 3点',price:1760,
     category:'pet-toys',parentCat:'pet',
     images:imgs('p040'),colors:['#1a6b3a'],sizes:['FREE'],stock:50,moq:2,
     desc:'有機栽培キャットニップ封入のおもちゃ3点セット。猫の興奮・遊びを促進。',
     specs:'成分：有機キャットニップ / 内容：3点（ネズミ・ボール・クッション）/ 補充用ニップ付'},
  ];

  // ── CAT_NAMES（カテゴリー名称マップ） ──
  window.HINOKA_CAT_NAMES = {
    'for-business':'For Business', 'for-life':'For Life',
    'home-living':'Home & Living', 'travel-outdoor':'Travel & Outdoor',
    'office-supplies':'Office Supplies / オフィス用品',
    'packaging':'Packaging Materials / 梱包資材',
    'industrial':'Industrial Products / 工業用品',
    'safety-workwear':'Safety & Workwear / 作業用品・安全用品',
    pet:'Pet Supplies', dog:'Dog / 犬用品', cat:'Cat / 猫用品',
    'pet-care':'Care / ケア用品', 'pet-toys':'Toys / おもちゃ',
    featured:'Featured Collection',
    'new-arrival':'New Arrival / 新商品', 'best-sellers':'Best Sellers / 人気商品',
    'seasonal':'Seasonal Picks / 季節特集', 'recommended':'Recommended by Us / スタッフ厳選',
    fashion:'ファッション', daily:'生活雑貨', kitchen:'Kitchen / キッチン用品',
    'dog-food':'ドッグフード', 'cat-food':'キャットフード',
    'pet-bed':'ベッド・ハウス', 'pet-collar':'首輪・リード',
    tops:'トップス', bottoms:'ボトムス', outer:'アウター',
    accessories:'アクセサリー', shoes:'シューズ',
    interior:'インテリア', bath:'バス・トイレ',
    storage:'収納・整理', aroma:'アロマ・キャンドル',
  };

  // ── PARENT_MAP ──
  window.HINOKA_PARENT_MAP = {
    'for-business':  ['office-supplies','packaging','industrial','safety-workwear'],
    'for-life':      ['home-living','kitchen','travel-outdoor','interior','bath','storage','aroma'],
    'home-living':   ['interior','bath','storage','aroma'],
    pet:             ['dog','cat','pet-care','pet-toys','dog-food','cat-food','pet-bed','pet-collar'],
    dog:             ['dog-food'],
    cat:             ['cat-food'],
    'pet-care':      ['pet-bed'],
    featured:        ['new-arrival','best-sellers','seasonal','recommended','tops','bottoms','outer','accessories','shoes'],
    fashion:         ['tops','bottoms','outer','accessories','shoes'],
    daily:           ['kitchen','interior','bath','storage','aroma'],
  };

  // ── PARENT_CAT（子→親 逆引き） ──
  window.HINOKA_PARENT_CAT = {
    'office-supplies':'for-business', 'packaging':'for-business',
    'industrial':'for-business', 'safety-workwear':'for-business',
    'home-living':'for-life', 'kitchen':'for-life', 'travel-outdoor':'for-life',
    'interior':'for-life', 'bath':'for-life', 'storage':'for-life', 'aroma':'for-life',
    dog:'pet', cat:'pet', 'pet-care':'pet', 'pet-toys':'pet',
    'dog-food':'pet', 'cat-food':'pet', 'pet-bed':'pet', 'pet-collar':'pet',
    'new-arrival':'featured', 'best-sellers':'featured', 'seasonal':'featured', 'recommended':'featured',
    tops:'fashion', bottoms:'fashion', outer:'fashion', accessories:'fashion', shoes:'fashion',
    kitchen:'daily', interior:'daily', bath:'daily', storage:'daily', aroma:'daily',
  };
})();
