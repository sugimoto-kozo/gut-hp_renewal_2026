<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no">
  <meta name="keywords" content="WEB,ウェブサイト,ウェブシステム,制作,名古屋">
  <meta name="description" content="グートは、名古屋を中心に活動している、WEB制作会社です。サイトの企画・立案から、設計、制作、システム開発、運用、SEMまでを一貫してお引き受けいたします。">
  <title>ウェブサイト制作 グート</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/common/css/reset.css">
  <link rel="stylesheet" href="/common/css/global.css">
  <link rel="stylesheet" href="/common/css/slick.css">
  <link rel="stylesheet" href="/common/css/slick-theme.css">
  <link rel="stylesheet" href="/common/css/base.css?<?php echo date('Ymd-Hi'); ?>">
  <link rel="stylesheet" href="/common/css/top.css?<?php echo date('Ymd-Hi'); ?>">
  <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    onerror="this.onerror=null;this.src='/common/js/jquery-3.7.1.min.js'"></script>
  <script defer src="/common/js/slick.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js"></script>
  <script defer src="/common/js/abstract_blur.js"></script>
  <script defer src="/common/js/abstract.js"></script>
  <script defer src="/common/js/icosahedron.js"></script>
  <script defer src="/common/js/custom.js"></script>
  <script defer src="/common/js/philosophy.js"></script>
  <script defer src="/common/js/top.js"></script>

  <?php include_once $_SERVER['DOCUMENT_ROOT']."/common/include/tracking.php"; ?>
</head>
<body>
<?php include $_SERVER['DOCUMENT_ROOT']."/common/include/pageHead.php"; ?>
  <main>
    <section id="top-visual">
      <div class="bg">
        <div class="wrap">

          <div class="text-wrap">
            <div class="title font-01"><span><div class="icosahedron"></div>Think. Embody. Sustain.</span></div>
            <h1>ウェブサイト制作とDX支援で、<br class="sp">ビジネスをもっとスマートに。</h1>
          </div>
          <canvas class="canvasNoise"></canvas>
          <canvas class="canvasClear"></canvas>
        </div>
      </div>
    </section>
    <dl id="slider-topics">
      <div>
        <dt>2025.05.01</dt>
        <dd>ゴールデンウィーク 営業日のご案内</dd>
      </div>
      <div>
        <dt>2025.05.01</dt>
        <dd>ゴールデンウィーク 営業日のご案内ゴールデンウィーク 営業日のご案内ゴールデンウィーク 営業日のご案内</dd>
      </div>
      <div>
        <dt>2025.05.01</dt>
        <dd>ゴールデンウィーク 営業日のご案内</dd>
      </div>
    </dl>

    <section id="about">
      <div class="title-a">
        <div class="container">
          <div class="icosahedron"></div>
          <p class="font-01">Mission</p>
          <h2>私たちの目的</h2>
        </div>
      </div>

      <div class="l_col-2 container">
        <section id="about1">
          <h3 class="title"><span>全て</span>の<span>ビジネス</span>に<br><span>未来</span>へ<span>繋ぐ</span><br><span class="gradient">チカラ</span>と、<span class="gradient second">ヒラメキ</span>を。</h3>
          <div class="text">
            <p>インターネットが、情報と通信を支える社会の基盤（インフラ）となった現代、あらゆる規模・業種の企業がその力を活用する時代に。</p>
            <p>この活用こそが、事業の継続や発展を左右する鍵になると、私たちは考えます。</p>
            <p>一方で、情報はあふれ、正しく「伝える」こと自体が困難になりつつあります。いま求められているのは、情報をどう活かすかという“設計”です。</p>
          </div>
          <div id="move-photo" class="l_col-2">
            <figure class="radius"><img src="/common/top/ph_about-01.jpg" alt=""></figure>
            <figure class="radius"><img src="/common/top/ph_about-02.jpg" alt=""></figure>
          </div>
        </section>

        <section id="about2">
          <figure class="radius"><img src="/common/top/ph_about-03.jpg" alt=""></figure>
          <h3 class="title-b"><span>Think.</span> <br class="sp"><span>Embody.</span> <br class="sp"><span>Sustain.</span></h3>
          <div class="text">
            <p>そして、この課題を解決するために、私たちは “Think. Embody. Sustain.” という行動指針を掲げています。これは、情報を正しく届け、活用し、未来へつなぐための、私たちの根本的なアプローチです。</p>
            <p>お客様のビジネスを深く理解し、その本質を伝える最適な提案としくみを追求します。そして、末永く共に成長していけるパートナーであり続けたいと願っています。</p>
          </div>
        </section>
      </div>

      <section id="system">
        <div class="container">
          <h3 class="title"><span>ウェブサイトだけでなくシステムを<br class="sp">構築する理由をご紹介します</span></h3>
          <div class="btn-a"><a href="#">こんな仕組みを作ってきました！</a></div>
        </div>
      </section>
    </section>

    <section id="service">
      <div class="title-a blue">
        <div class="container">
          <div class="icosahedron"></div>
          <p class="font-01">Service</p>
          <h2>サービスのご案内</h2>
        </div>
      </div>

      <section id="strength" class="container">
        <div class="l_col-title">
          <h3 class="title-b font-01"><span>Our</span><br class="sp"><span>Strengths</span></h3>
          <div class="text">
            <p>現場で積み重ねてきた経験を活かした､<br>
            無理のない仕組みづくりが私たちの基本思想です。</p>
          </div>
        </div>

        <div class="l_col-3">
          <section>
            <figure><img src="/common/top/img_strength-01.png" alt="経験豊富　選択肢をご用意します"></figure>
            <h4 class="title">経験豊富<br>選択肢をご用意します</h4>
            <div class="text">
              <p>業種・規模に合わせた柔軟な提案。迷っている段階からでも、一緒に整理します。</p>
            </div>
          </section>

          <section>
            <figure><img src="/common/top/img_strength-02.png" alt="社内完結　外注に頼らない一貫性"></figure>
            <h4 class="title">社内完結<br>外注に頼らない一貫性</h4>
            <div class="text">
              <p>デザインから開発、CMS実装まで内製。修正や追加にも即応できる体制。</p>
            </div>
          </section>

          <section>
            <figure><img src="/common/top/img_strength-03.png" alt="公開後の伴走支援　続けられる仕組みを設計します"></figure>
            <h4 class="title">公開後の伴走支援<br>続けられる仕組みを設計します</h4>
            <div class="text">
              <p>更新、改善、保守まで含めて対応。続ける前提で設計するから、息の長い運用が可能に。</p>
            </div>
          </section>
        </div>
      </section>

      <section id="philosophy">
        <div class="container">
          <h3 class="title-b font-01"><span>Think.</span><br class="sp"><span>Embody.</span><br class="sp"><span>Sustain.</span></h3>
          <div class="text">
            <p>お客様の「これを伝えたい」「うまく言えないけど困ってる」といった声を起点に、<br>
            企画・設計・制作・運用まで、必要なことを一緒に考え、かたちにしてきました。</p>
            <p>ご相談の入口は「Webを作りたい」でも、「更新がうまくいかない」でも構いません。<br>
            技術とデザインと現場の知恵で、ちょうどいい着地点を一緒に見つけましょう。</p>
          </div>
          <!-- <figure><img src="/common/top/img_philosophy.png" alt="目的を明確にし、「何を、誰に、どう伝えるか」を整理します。ヒアリングや分析から始まり、構成・情報設計・UIなど、サイトの“骨格”を丁寧に組み立てます。見た目に入る前に、本質を一緒に考えるフェーズです。"></figure> -->
          <div class="img">
            <object id="svg-fig" data="/common/top/fig_Approach.svg" type="image/svg+xml"></object>
            <div class="text">
              <p class="think">[think]目的を明確にし、「何を、誰に、どう伝えるか」を整理します。ヒアリングや分析から始まり、構成・情報設計・UIなど、サイトの“骨格”を丁寧に組み立てます。見た目に入る前に、本質を一緒に考えるフェーズです。</p>
              <p class="sustain">[sustain]目的を明確にし、「何を、誰に、どう伝えるか」を整理します。ヒアリングや分析から始まり、構成・情報設計・UIなど、サイトの“骨格”を丁寧に組み立てます。見た目に入る前に、本質を一緒に考えるフェーズです。</p>
              <p class="embody">[embody]目的を明確にし、「何を、誰に、どう伝えるか」を整理します。ヒアリングや分析から始まり、構成・情報設計・UIなど、サイトの“骨格”を丁寧に組み立てます。見た目に入る前に、本質を一緒に考えるフェーズです。</p>
            </div>
          </div>
        </div>
      </section>
    </section>


    <section id="case-study">
      <div class="title-a white">
        <div class="container">
          <div class="icosahedron"></div>
          <p class="font-01">Case Study</p>
          <h2>ケーススタディ</h2>
        </div>
      </div>

      <section id="reason">
        <p class="flowing font-01">Why We Build Systems, Not Just Websites</p>
        <h3 class="title">ウェブサイトだけでなく<br class="sp">システムを構築する理由</h3>
        <ul id="case-study-slider">
          <li><img src="/common/top/img_reason-slider-01.png" alt="フランチャイズ × 地域分散型戦略サイト運用パッケージ"></li>
          <li><img src="/common/top/img_reason-slider-02.png" alt="高付加価値CMS開発"></li>
          <li><img src="/common/top/img_reason-slider-03.png" alt="社内業務の効率化・自動化支援"></li>
        </ul>
      </section>

      <section id="works" class="container">
        <div class="title-c">
          <p class="en font-01">Website</p>
          <h3 class="title"><span>サイト制作実績</span></h3>
        </div>

        <div class="l_col-3">
          <div>
            <figure><img src="/common/top/ph_works-01.jpg" alt="株式会社サンテクノ　様"></figure>
            <p class="name">サンテクノ様</p>
            <p class="url font-01"><a href="https://www.suntekno.co.jp/" target="_blank">suntekno.co.jp</a></p>
          </div>

          <div>
            <figure><img src="/common/top/ph_works-01.jpg" alt="株式会社サンテクノ　様"></figure>
            <p class="name">サンテクノ様</p>
            <p class="url font-01"><a href="https://www.suntekno.co.jp/" target="_blank">suntekno.co.jp</a></p>
          </div>

          <div>
            <figure><img src="/common/top/ph_works-01.jpg" alt="株式会社サンテクノ　様"></figure>
            <p class="name">サンテクノ様</p>
            <p class="url font-01"><a href="https://www.suntekno.co.jp/" target="_blank">suntekno.co.jp</a></p>
          </div>
        </div>
      </section>
    </section>

    <section id="work-flow">
      <div class="bg">
        <div class="wrap">
          <canvas class="canvasNoise"></canvas>
          <canvas class="canvasClear"></canvas>
        </div>
      </div>

      <div class="title-a white">
        <div class="container">
          <div class="icosahedron"></div>
          <p class="font-01">Work Flow</p>
          <h2>制作の流れ</h2>
        </div>
      </div>

      <section id="flow">
        <div class="container">
          <div class="l_col-title">
            <h3 class="title-b font-01"><span>How</span> <br class="sp"><span>We</span> <span>Work</span></h3>
            <div class="text">
              <p>現場で積み重ねてきた経験を活かした､<br>
              無理のない仕組みづくりが私たちの基本思想です。</p>
            </div>
          </div>

          <div id="flow-list">
            <section>
              <div class="l_col-head">
                <p class="no">1</p>
                <div class="l_col-title">
                  <p class="font-01">Contact.</p>
                  <h4>お問い合わせ</h4>
                </div>
              </div>
              <div class="body">
                <div class="l_col-2">
                  <div class="text">
                    <h5 class="title">タイトル</h5>
                    <p>テキスト</p>
                    <ul class="list-a">
                      <li>テキスト</li>
                    </ul>
                  </div>
                  <figure><img src="" alt=""></figure>
                </div>
              </div>
            </section>

            <section>
              <div class="l_col-head">
                <p class="no">2</p>
                <div class="l_col-title">
                  <p class="font-01">Explore..</p>
                  <h4>探索</h4>                  
                </div>
              </div>
              <div class="body">
                <div class="l_col-2">
                  <div class="text">
                    <h5 class="title">ヒアリングと調査を通じて、<br>プロジェクトの方向性を探ります。</h5>
                    <p>課題を伺う</p>
                    <ul class="list-a">
                      <li>事業内容・業種の特性（詳細）</li>
                      <li>現状サイトの評価や課題</li>
                      <li>ご希望のデザインの雰囲気</li>
                      <li>必要な機能（CMS、フォームなど）</li>
                      <li>納品形態・ご予算・納期</li>
                      <li>公開後の更新体制や運用方法</li>
                    </ul>

                    <p>状況の把握（調査・分析）</p>
                    <ul class="list-a">
                      <li>想定される集客導線（検索・広告・SNS等）</li>
                      <li>業界動向・競合サイト・お客様のご要望背景</li>
                      <li>現在のホスティング環境（移行が必要かなど）</li>
                    </ul>

                    <p>初期構想を描く（軽いアイデア出し）</p>
                    <ul class="list-a">
                      <li>表現の方向性（例：信頼感／親しみ／スピード感 など）</li>
                      <li>写真やコピーの使い方に関するアイデア</li>
                      <li>コンテンツの仕掛けや更新の工夫<br>（施工事例の見せ方、更新のしやすさなど）</li>
                      <li>他業種・他地域での成功例の引用（応用できそうな事例紹介）</li>
                      <li>必要に応じて簡単なスケッチや参考サイトもその場でご紹介</li>
                    </ul>
                  </div>
                  <figure><img src="" alt=""></figure>
                </div>
              </div>
            </section>

            <section>
              <div class="l_col-head">
                <p class="no">3</p>
                <div class="l_col-title">
                  <p class="font-01">Think...</p>
                  <h4>考える</h4>                  
                </div>
              </div>
              <div class="body">
                <div class="l_col-2">
                  <div class="text">
                    <h5 class="title">タイトル</h5>
                    <p>テキスト</p>
                    <ul class="list-a">
                      <li>テキスト</li>
                    </ul>
                  </div>
                  <figure><img src="" alt=""></figure>
                </div>
              </div>
            </section>

            <section>
              <div class="l_col-head">
                <p class="no">4</p>
                <div class="l_col-title">
                  <p class="font-01">Embody....</p>
                  <h4>形作る</h4>                  
                </div>
              </div>
              <div class="body">
                <div class="l_col-2">
                  <div class="text">
                    <h5 class="title">タイトル</h5>
                    <p>テキスト</p>
                    <ul class="list-a">
                      <li>テキスト</li>
                    </ul>
                  </div>
                  <figure><img src="" alt=""></figure>
                </div>
              </div>
            </section>

            <section>
              <div class="l_col-head">
                <p class="no">5</p>
                <div class="l_col-title">
                  <p class="font-01">Sustain.....</p>
                  <h4>続ける</h4>                  
                </div>
              </div>
              <div class="body">
                <div class="l_col-2">
                  <div class="text">
                    <h5 class="title">タイトル</h5>
                    <p>テキスト</p>
                    <ul class="list-a">
                      <li>テキスト</li>
                    </ul>
                  </div>
                  <figure><img src="" alt=""></figure>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>

    <section id="information">
      <div class="title-a white">
        <div class="container">
          <div class="icosahedron"></div>
          <p class="font-01">Information</p>
          <h2>お知らせ</h2>
        </div>
      </div>

      <section id="topics" class="container">
        <div class="title-c">
          <p class="en font-01">Topics</p>
          <h3 class="title"><span>トピックス</span></h3>
        </div>

        <div id="topics-slider">
          <article>
            <div class="l_col-info">
              <p class="date font-01">2025.05.01</p>
              <p class="category">営業日のご案内</p>
            </div>
            <h4 class="title">ゴールデンウィーク営業日ご案内</h4>
            <div class="text">
              <p>誠に勝手ながら、2025年4月26日(土)～4月29日(火)および、5月3日(土)～5月6日(火)の間、休業とさせていただきます。 期間中に頂きましたお問い合わせは5月7日(木)より順次ご対応いたします。 </p>
            </div>
          </article>

          <article>
            <div class="l_col-info">
              <p class="date font-01">2025.05.01</p>
              <p class="category">営業日のご案内</p>
            </div>
            <h4 class="title">ゴールデンウィーク営業日ご案内ゴールデンウィーク営業日ご案内</h4>
            <div class="text">
              <p>誠に勝手ながら、2025年4月26日(土)～4月29日(火)および、5月3日(土)～5月6日(火)の間、休業とさせていただきます。 期間中に頂きましたお問い合わせは5月7日(木)より順次ご対応いたします。誠に勝手ながら、2025年4月26日(土)～4月29日(火)および、5月3日(土)～5月6日(火)の間、休業とさせていただきます。 期間中に頂きましたお問い合わせは5月7日(木)より順次ご対応いたします。 </p>
            </div>
          </article>

          <article>
            <div class="l_col-info">
              <p class="date font-01">2025.05.01</p>
              <p class="category">営業日のご案内</p>
            </div>
            <h4 class="title">ゴールデンウィーク営業日ご案内</h4>
            <div class="text">
              <p>誠に勝手ながら、2025年4月26日(土)～4月29日(火)および、5月3日(土)～5月6日(火)の間、休業とさせていただきます。 期間中に頂きましたお問い合わせは5月7日(木)より順次ご対応いたします。 </p>
            </div>
          </article>

          <article>
            <div class="l_col-info">
              <p class="date font-01">2025.05.01</p>
              <p class="category">営業日のご案内</p>
            </div>
            <h4 class="title">ゴールデンウィーク営業日ご案内</h4>
            <div class="text">
              <p>誠に勝手ながら、2025年4月26日(土)～4月29日(火)および、5月3日(土)～5月6日(火)の間、休業とさせていただきます。 期間中に頂きましたお問い合わせは5月7日(木)より順次ご対応いたします。 </p>
            </div>
          </article>
        </div>
      </section>
    </section>

    <section id="profile">
      <div class="container">
        <div class="title-c">
          <p class="en font-01">PROFILE</p>
          <h2 class="title"><span>企業情報</span></h2>
        </div>

        <figure><img src="/common/top/ph_profile.jpg" alt="有限会社グートは、地元名古屋を拠点に活動するWEBに特化する制作会社です"></figure>
        <div class="text">
          <p>有限会社グートは、地元名古屋を拠点に活動するWEBに特化する制作会社です。<br>
          フリーランス並みの軽快さに、立派なオフィスを構える制作会社よりもリーズナブル。そんな“隙間のポジション”と、20年以上の業界経験を武器に、地に足のついた仕事を続けてきました。</p>
          <p>人数が少ない分、自分たちの強みをどう活かすか。どこまで責任を持てるか。<br>
          毎回、全員でそれを問いながら、地に足のついた仕組みと実装で勝負してきました。</p>
          <p>つくったものが“ちゃんと機能する”こと、“続けられる”ことを何より大切にしています。</p>
          <p>見た目だけで生き延びてきたわけじゃない。<br>
          だからこそ、手数は少なくても、説得力はある ──<br class="pc">
          そんな会社です。</p>
        </div>
      </div>

      <section id="company-data">
        <div class="container">
          <h2 class="title font-01">DATA</h2>
          <div class="l_col-2">
            <dl>
              <div class="l_col-data">
                <dt>名称</dt>
                <dd>有限会社グート</dd>
              </div>

              <div class="l_col-data">
                <dt>電話番号</dt>
                <dd>052-228-0035</dd>
              </div>

              <div class="l_col-data">
                <dt>代表取締役</dt>
                <dd>中村 彰宏</dd>
              </div>

              <div class="l_col-data">
                <dt>設立日</dt>
                <dd>2006年3月9日</dd>
              </div>
            </dl>

            <dl>
              <div class="l_col-data">
                <dt>営業時間</dt>
                <dd>10:00～19:00(土日祝休日)</dd>
              </div>

              <div class="l_col-data">
                <dt>所在地</dt>
                <dd>〒461-0001<br>
                名古屋市東区泉1-18-3<br>
                泉ステイトリービル401</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div id="map">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.2353656650016!2d136.90938225236212!3d35.175685842931806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60037186cdbbc2f3%3A0x3d2085c29b4d7717!2z5pyJ6ZmQ5Lya56S-44Kw44O844OI!5e0!3m2!1sja!2sjp!4v1766457091323!5m2!1sja!2sjp" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>


    <section id="contact">
      <div class="container">
        <div class="title-c">
          <p class="en font-01">CONTACT</p>
          <h2 class="title"><span>お問い合わせ</span></h2>
        </div>

        <div class="l_col-2">
          <section class="tel-contact">
            <div class="l_col-title">
              <p class="font-01">PHONE</p>
              <h3 class="title">お電話でのお問い合わせ</h3>
            </div>
            <p class="tel"><a href="tel:0522280035">052-228-0035</a></p>
          </section>

          <section class="form-contact">
            <div class="l_col-title">
              <p class="font-01">INTERNET</p>
              <h3 class="title">サイトからのお問い合わせ</h3>
            </div>
            <p class="form"><a href="#">お問い合わせフォーム</a></p>
          </section>
        </div>

        <div class="bnr"><a href="#"><img src="/common/top/bnr_soudan.png" alt=""></a></div>
      </div>
    </section>

  </main>
  <?php include $_SERVER['DOCUMENT_ROOT']."/common/include/pageFoot.php"; ?>
</body>
</html>
