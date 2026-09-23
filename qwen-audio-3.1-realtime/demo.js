'use strict';
/* Per-channel RMS envelopes (160 buckets, normalised) extracted offline from the
   stereo demo recordings: left channel = user side, right channel = assistant. */
const WAVEFORMS = {"multiparty":[0.01,0.01,0.01,0.01,0.01,0.0,0.06,0.07,0.8,0.93,0.36,0.08,0.29,0.64,0.55,0.16,0.05,0.01,0.02,0.6,0.52,0.3,0.35,0.03,0.0,0.19,0.39,0.43,0.74,0.67,0.47,0.33,0.42,0.33,0.46,0.39,0.25,0.26,0.05,0.0,0.22,0.21,0.52,0.42,0.25,0.27,0.4,0.22,0.21,0.19,0.19,0.15,0.12,0.01,0.01,0.0,0.0,0.0,0.0,0.0,0.0,0.01,0.01,0.01,0.07,0.17,0.18,0.13,0.15,0.17,0.22,0.13,0.03,0.08,0.15,0.08,0.08,0.21,0.16,0.02,0.24,0.2,0.15,0.03,0.14,0.05,0.25,0.12,0.03,0.03,0.03,0.03,0.09,0.19,0.15,0.12,0.12,0.11,0.14,0.07,0.11,0.09,0.11,0.09,0.06,0.0,0.02,0.03,0.05,0.01,0.0,0.01,0.06,0.05,0.01,0.01,0.01,0.0,0.02,0.13,0.1,0.17,0.16,0.11,0.09,0.16,0.25,0.04,0.01,0.08,0.15,0.11,0.31,0.1,0.23,0.13,0.11,0.14,0.08,0.2,0.14,0.25,0.25,0.35,0.28,0.1,0.01,0.01,0.13,0.19,0.15,0.24,0.09,0.01,0.01,0.01,0.05,0.12,0.17,0.12,0.31,0.15,0.09,0.2,0.2,0.32,0.25,0.2,0.26,0.1,0.18,0.21,0.17,0.26,0.16,0.17,0.05,0.15,0.18,0.17,0.16,0.19,0.11,0.04,0.01,0.04,0.01,0.01,0.01,0.01,0.0,0.02,0.03,0.01,0.02,0.04,0.02,0.01,0.05,0.03,0.01,0.01,0.01,0.04,0.02,0.03,0.03,0.87,0.96,0.58,0.37,0.04,0.02,0.02,0.78,1.0,0.55,0.71,0.45,0.54,0.53,0.33,0.54,0.38,0.24,0.32,0.2,0.27,0.15,0.51,0.72,0.28,0.33,0.37,0.54,0.26,0.43,0.64,0.4,0.67,0.42,0.1,0.02,0.0,0.0,0.01,0.0,0.0,0.0,0.0,0.01,0.0,0.01,0.01,0.03,0.02,0.02,0.06,0.32,0.37,0.44,0.15,0.2,0.32,0.24,0.05,0.01,0.39,0.41,0.37,0.41,0.33,0.32,0.14,0.19,0.28,0.22,0.01,0.01,0.01,0.2,0.42,0.32,0.31,0.39,0.21,0.21,0.15,0.31,0.25,0.5,0.44,0.22,0.21,0.03,0.01,0.22,0.52,0.36,0.33,0.24,0.27,0.14,0.2,0.01,0.01,0.03,0.29,0.29,0.22,0.22,0.32,0.24,0.41,0.43,0.21,0.0,0.0,0.09,0.6,0.55,0.15,0.32,0.19,0.14,0.21,0.3,0.25,0.33,0.08,0.02,0.23,0.14,0.44,0.65,0.62,0.93,0.15,0.3,0.4,0.19,0.01,0.01,0.01,0.85,0.42,0.78,0.89,0.53,0.52,0.48,0.51,0.38,0.25,0.49,0.2,0.28,0.23,0.18,0.22,0.02,0.01,0.0,0.17,0.51,0.46,0.29,0.25,0.2,0.39,0.35,0.19,0.18,0.23,0.08,0.23,0.01,0.03,0.26,0.31,0.17,0.32,0.23,0.2,0.05,0.16,0.17,0.17,0.07,0.13,0.03,0.02,0.02,0.02,0.01,0.01,0.0,0.0,0.0,0.02,0.05,0.04,0.01,0.01,0.01,0.0,0.0,0.03,0.12,0.28,0.3,0.37,0.12,0.0,0.0,0.04,0.36,0.59,0.44,0.3,0.01,0.0,0.03,0.2,0.45,0.19,0.32,0.46,0.34,0.19,0.15,0.22,0.24,0.18,0.08,0.17,0.01,0.0,0.0,0.01,0.01,0.18,0.32,0.23,0.52,0.4,0.26,0.33,0.07,0.2,0.21,0.12,0.22,0.24,0.14,0.11,0.28,0.06,0.0,0.0,0.05,0.26,0.42,0.2,0.19,0.26,0.19,0.06,0.04,0.33,0.24,0.33,0.35,0.11,0.2,0.2,0.18,0.21,0.28,0.11,0.25,0.12,0.19,0.07,0.0,0.0,0.15,0.28,0.18,0.26,0.22,0.52,0.29,0.17,0.08,0.1,0.01,0.01,0.02,0.47,0.9,0.66,0.58,0.37,0.23,0.09,0.27,0.62,0.35,0.68,0.72,0.79,0.32,0.57,0.62,0.32,0.18,0.33,0.28,0.47,0.41,0.64,0.32,0.18,0.16,0.19,0.12,0.43,0.08,0.25,0.36,0.14,0.2,0.04,0.15,0.05,0.07,0.25,0.44,0.12,0.31,0.22,0.19,0.15,0.23,0.22,0.25,0.28,0.31,0.13,0.18,0.04,0.03,0.02,0.02,0.05,0.35,0.24,0.36,0.42,0.4,0.36,0.22,0.27,0.23,0.32,0.32,0.28,0.21,0.11,0.21,0.14,0.18,0.25,0.05,0.03,0.04,0.36,0.3,0.22,0.12,0.24,0.37,0.01,0.01,0.01,0.01,0.05,0.37,0.38,0.38,0.14,0.53,0.26,0.23,0.27,0.3,0.24,0.17,0.23,0.22,0.17,0.36,0.22,0.19,0.0,0.0,0.02,0.28,0.28,0.2,0.4,0.23,0.33,0.04,0.0,0.0,0.0,0.0,0.01,0.01,0.0,0.01,0.0,0.01,0.01,0.01,0.0,0.0,0.01,0.02,0.04,0.07,0.14,0.16,0.19,0.14,0.11,0.18,0.23,0.13,0.21,0.2,0.08,0.07,0.15,0.19,0.06,0.12,0.12,0.12,0.09,0.03,0.11,0.12,0.07,0.05,0.01,0.0,0.0,0.01,0.02,0.02,0.01,0.02,0.04,0.06,0.02,0.15,0.22,0.18,0.05,0.1,0.25,0.04,0.25,0.1,0.01,0.01,0.01,0.01,0.0,0.03,0.02,0.06,0.02,0.02,0.07,0.04,0.04,0.04,0.11,0.07,0.04,0.06,0.07,0.05,0.01,0.06,0.09,0.04,0.02,0.03,0.05,0.04,0.06,0.05,0.03,0.03,0.0,0.01,0.03,0.0,0.11,0.13,0.05,0.02,0.04,0.01,0.01],"semantic":[0.02,0.02,0.01,0.01,0.01,0.0,0.05,0.04,0.01,0.01,0.09,1.0,0.8,0.56,0.62,0.4,0.29,0.3,0.27,0.28,0.26,0.36,0.27,0.21,0.19,0.24,0.08,0.01,0.06,0.28,0.61,0.26,0.26,0.23,0.25,0.18,0.2,0.18,0.13,0.22,0.2,0.17,0.15,0.06,0.01,0.02,0.01,0.0,0.01,0.0,0.01,0.34,0.33,0.36,0.22,0.06,0.31,0.36,0.13,0.04,0.03,0.21,0.35,0.26,0.44,0.34,0.2,0.23,0.14,0.13,0.26,0.01,0.09,0.17,0.26,0.34,0.16,0.24,0.24,0.35,0.01,0.01,0.13,0.35,0.24,0.16,0.1,0.2,0.16,0.21,0.26,0.33,0.33,0.21,0.3,0.25,0.1,0.19,0.1,0.01,0.01,0.28,0.35,0.3,0.18,0.38,0.2,0.14,0.18,0.26,0.31,0.18,0.32,0.26,0.32,0.04,0.0,0.05,0.19,0.28,0.35,0.24,0.23,0.26,0.45,0.4,0.3,0.14,0.19,0.01,0.0,0.23,0.21,0.25,0.27,0.26,0.45,0.39,0.41,0.5,0.47,0.3,0.27,0.35,0.06,0.01,0.02,0.27,0.38,0.57,0.26,0.3,0.32,0.23,0.25,0.35,0.21,0.3,0.07,0.01,0.12,0.22,0.33,0.53,0.33,0.37,0.34,0.24,0.01,0.0,0.25,0.4,0.31,0.43,0.25,0.47,0.16,0.24,0.17,0.24,0.14,0.14,0.07,0.02,0.01,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01,0.03,0.03,0.24,0.34,0.01,0.02,0.14,0.31,0.37,0.33,0.06,0.05,0.03,0.02,0.36,0.23,0.28,0.19,0.27,0.29,0.01,0.0,0.27,0.34,0.33,0.39,0.47,0.08,0.25,0.27,0.16,0.23,0.08,0.18,0.0,0.02,0.01,0.02,0.04,0.05,0.04,0.03,0.02,0.02,0.15,0.46,0.28,0.35,0.34,0.3,0.4,0.55,0.35,0.33,0.39,0.21,0.24,0.17,0.18,0.15,0.19,0.19,0.03,0.01,0.0,0.0,0.17,0.33,0.39,0.41,0.3,0.22,0.26,0.16,0.04,0.04,0.01,0.01,0.03,0.04,0.02,0.0,0.02,0.03,0.0,0.01,0.01,0.02,0.03,0.06,0.06,0.05,0.02,0.05,0.03,0.02,0.04,0.01,0.36,0.39,0.46,0.55,0.49,0.28,0.37,0.42,0.13,0.36,0.37,0.25,0.15,0.21,0.17,0.03,0.02,0.02,0.4,0.36,0.34,0.18,0.22,0.17,0.1,0.18,0.11,0.05,0.02,0.02,0.02,0.02,0.01,0.01,0.0,0.0,0.0,0.02,0.02,0.01,0.08,0.02,0.0,0.02,0.02,0.01,0.0,0.01,0.02,0.03,0.02,0.22,0.33,0.21,0.05,0.06,0.03,0.66,0.79,0.4,0.57,0.84,0.56,0.27,0.5,0.27,0.51,0.37,0.14,0.2,0.36,0.12,0.32,0.31,0.26,0.28,0.16,0.21,0.13,0.13,0.01,0.01,0.01,0.03,0.02,0.58,0.51,0.28,0.19,0.17,0.16,0.23,0.15,0.2,0.06,0.01,0.01,0.01,0.02,0.01,0.01,0.0,0.01,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02,0.05,0.01,0.04,0.03,0.01,0.01,0.61,0.53,0.68,0.51,0.4,0.04,0.03,0.06,0.01,0.01,0.01,0.0,0.0,0.0,0.0,0.0,0.0,0.01,0.02,0.01,0.0,0.34,0.35,0.14,0.19,0.0,0.02,0.05,0.14,0.36,0.44,0.19,0.16,0.27,0.18,0.27,0.26,0.2,0.0,0.01,0.03,0.43,0.5,0.31,0.29,0.29,0.12,0.15,0.38,0.14,0.02,0.04,0.34,0.27,0.13,0.21,0.17,0.28,0.0,0.06,0.25,0.45,0.12,0.29,0.25,0.01,0.01,0.01,0.41,0.3,0.33,0.47,0.38,0.38,0.21,0.25,0.31,0.33,0.01,0.2,0.26,0.17,0.16,0.23,0.19,0.13,0.0,0.01,0.03,0.26,0.19,0.22,0.31,0.15,0.38,0.01,0.05,0.24,0.12,0.19,0.15,0.21,0.02,0.29,0.09,0.27,0.17,0.32,0.42,0.14,0.34,0.36,0.29,0.03,0.02,0.03,0.01,0.33,0.53,0.32,0.25,0.21,0.19,0.39,0.08,0.03,0.03,0.2,0.27,0.24,0.15,0.54,0.31,0.05,0.25,0.24,0.13,0.21,0.6,0.03,0.23,0.09,0.2,0.37,0.26,0.26,0.44,0.31,0.0,0.01,0.01,0.28,0.4,0.21,0.26,0.27,0.25,0.26,0.34,0.27,0.2,0.35,0.29,0.21,0.42,0.37,0.21,0.01,0.0,0.01,0.15,0.42,0.51,0.31,0.27,0.24,0.34,0.26,0.25,0.45,0.0,0.0,0.01,0.31,0.42,0.23,0.35,0.21,0.29,0.42,0.37,0.28,0.3,0.5,0.19,0.26,0.01,0.15,0.29,0.2,0.3,0.17,0.04,0.01,0.0,0.16,0.44,0.37,0.13,0.33,0.3,0.48,0.18,0.42,0.5,0.0,0.0,0.0,0.01,0.22,0.5,0.22,0.4,0.4,0.26,0.06,0.0,0.03,0.4,0.26,0.3,0.49,0.21,0.19,0.28,0.01,0.0,0.01,0.02,0.46,0.2,0.31,0.36,0.34,0.21,0.35,0.28,0.01,0.16,0.16,0.21,0.26,0.24,0.37,0.11,0.29,0.26,0.17,0.28,0.25,0.24,0.18,0.11,0.34,0.0,0.01,0.02,0.02,0.44,0.45,0.29,0.28,0.23,0.29,0.25,0.2,0.25,0.14,0.13,0.26,0.22,0.17,0.16,0.01,0.01,0.0,0.32,0.4,0.28,0.22,0.16,0.28,0.31,0.34,0.35,0.23,0.14,0.0,0.3,0.19,0.3,0.21,0.12,0.02,0.01,0.01,0.01,0.11,0.47,0.25]};
// Speech-activity timelines are derived from the stereo channels of the source recordings.
const DEMOS = {
  multilingual: {
    title: 'Follow the language, keep the plan',
    summary: 'One trip-planning conversation moves between Chinese, Japanese, and Korean. The assistant answers in whatever language the user speaks, while carrying the same itinerary, allergy constraint, and travel context across the switch.',
    media: {type: 'audio', src: 'assets/demo/multi-lingual.mp3', channels: 'Single channel · user and assistant in one recording'},
    tags: ['Chinese', 'Japanese', 'Korean', 'Context retained'],
    transcript: [
      {role: 'user', lang: 'ZH', text: '我打算下个月去日本和韩国旅行，你能帮我规划一下吗？接下来我会用不同的语言问你问题，请用我说的那种语言回答我。'},
      {role: 'agent', lang: 'ZH', text: '好的呀！我可以帮你规划日本和韩国的旅行行程。请告诉我你的出发时间、预算、兴趣偏好等信息，我会根据你的需求提供建议。另外，我会按照你使用的语言来回答你的问题。'},
      {role: 'user', lang: 'ZH', text: '我从上海出发，想先在国内玩两天再去，有什么城市推荐吗？'},
      {role: 'agent', lang: 'ZH', text: '当然可以呀！从上海出发，国内玩两天的话，推荐你去杭州或者苏州。这两个城市离上海很近，交通方便，而且风景优美，适合短途旅行。杭州有西湖、灵隐寺等景点，苏州则有园林和古镇，都很值得一游。'},
      {role: 'user', lang: 'JA', text: '京都で一日だけ自由時間があるんですが、朝から夕方までのおすすめコースを教えてもらえますか？'},
      {role: 'agent', lang: 'JA', text: 'もちろん！京都で一日の自由時間があるなら、こんなコースがおすすめです。朝は伏見稲荷大社で千本鳥居を散策し、昼は祇園エリアで伝統的な町並みを楽しみながらランチ。午後は清水寺や二年坂・三年坂を歩き、夕方は鴨川沿いで夕日を眺めながらリラックスするのが良いですよ。'},
      {role: 'user', lang: 'JA', text: '食べ物についてなんですが、京都でしか食べられない地元料理ってありますか？アレルギーがあるんで、注意点も教えてほしいです。'},
      {role: 'agent', lang: 'JA', text: 'はい、京都には「湯豆腐」や「京野菜を使った料理」など、地域特有の郷土料理があります。アレルギーがある場合は、事前にレストランに食材のアレルギー情報を伝えることが重要です。また、日本では食品表示が義務付けられているため、パッケージ食品の成分表を確認することもできます。'},
      {role: 'user', lang: 'KO', text: '서울에서는 2박 3일 머물 건데, 명동 근처에서 가볼 만한 곳이랑 현지인들이 자주 가는 식당 추천해 주세요.'},
      {role: 'agent', lang: 'KO', text: '명동 근처에서는 남산타워나 북촌 한옥마을을 가볼 수 있어요. 현지인들이 자주 가는 식당으로는 명동 칼국수나 광장시장의 분식집들이 인기가 많아요. 다만, 알레르기가 있다면 주문 전에 재료 성분을 꼭 확인하세요.'},
      {role: 'user', lang: 'ZH', text: '帮我把上面聊的内容整理成一个三天的行程表吧，标注一下每段的预算，控制在5000块以内。'},
      {role: 'agent', lang: 'ZH', text: '好的呀！这是为你整理的三天行程表（含国内两天 + 日本京都一天），总预算控制在 5000 元以内：\n第一天：上海出发 → 杭州（国内）\n- 上午：高铁前往杭州（约 1 小时，票价 80 元左右）\n- 下午：游览西湖、灵隐寺\n- 晚上：品尝杭帮菜\n- 预算：交通 160 元 + 门票 100 元 + 餐饮 200 元 + 住宿 300 元 = 760 元\n第二天：杭州 → 苏州（国内）\n- 上午：高铁前往苏州（约 1 小时，票价 50 元左右）\n- 下午：游览拙政园、平江路\n- 晚上：品尝苏式小吃\n- 预算：交通 100 元 + 门票 150 元 + 餐饮 200 元 + 住宿 300 元 = 750 元\n第三天：苏州 → 上海 → 京都（日本）\n- 上午：高铁返回上海（约 1 小时，票价 50 元左右）\n- 下午：飞往京都（机票约 2000 元，视航班而定）\n- 晚上：抵达京都，入住酒店\n- 预算：交通 50 元 + 机票 2000 元 + 住宿 400 元 = 2450 元\n总计预算：760 + 750 + 2450 = 3960 元（未包含购物及其他杂费，剩余约 1040 元可用于应急或额外消费）。\n注意：以上预算为估算值，实际费用可能因季节、航班价格等因素有所变化。建议提前预订机票和酒店以节省开支。'},
      {role: 'user', lang: 'JA', text: '最後に、日本と韓国で使える便利なアプリや、現地で気をつけるべきマナーがあれば教えていただけますか？'},
      {role: 'agent', lang: 'JA', text: 'はい、日本と韓国で便利なアプリとマナーについてお伝えしますね。\n【便利なアプリ】\n- 日本：Google Maps（地図・交通案内）、乗換案内（電車時刻表）、PayPay（電子決済）\n- 韓国：Naver Map（地図・交通案内）、KakaoMap（地図）、T-money（交通カードアプリ）\n【現地で気をつけるべきマナー】\n- 日本：電車内では静かにする、ゴミは持ち帰る、列に並ぶ習慣を守る\n- 韓国：公共の場では大声を出さない、年長者への敬意を示す、食事の際は箸の使い方に注意\nまた、アレルギーがある場合は、現地の言葉で食材のアレルギーを伝えるカードを持参すると安心ですよ。'}
    ],
    note: 'Turn audio is cut from the single-channel recording at silence-detected boundaries (about ±0.2s); turn order follows the recording. Turns 11–14 are transcribed from the audio for this preview.',
    turns: [
      {src: 'assets/demo/ml-turns/turn01.mp3', at: [0.0, 9.6]},
      {src: 'assets/demo/ml-turns/turn02.mp3', at: [10.6, 24.0]},
      {src: 'assets/demo/ml-turns/turn03.mp3', at: [25.4, 30.5]},
      {src: 'assets/demo/ml-turns/turn04.mp3', at: [31.6, 49.3]},
      {src: 'assets/demo/ml-turns/turn05.mp3', at: [50.9, 57.1]},
      {src: 'assets/demo/ml-turns/turn06.mp3', at: [58.0, 79.9]},
      {src: 'assets/demo/ml-turns/turn07.mp3', at: [81.4, 89.7]},
      {src: 'assets/demo/ml-turns/turn08.mp3', at: [90.6, 111.5]},
      {src: 'assets/demo/ml-turns/turn09.mp3', at: [112.9, 120.6]},
      {src: 'assets/demo/ml-turns/turn10.mp3', at: [121.9, 139.0]},
      {src: 'assets/demo/ml-turns/turn11.mp3', at: [140.6, 148.0]},
      {src: 'assets/demo/ml-turns/turn12.mp3', at: [149.0, 254.8]},
      {src: 'assets/demo/ml-turns/turn13.mp3', at: [256.3, 263.6]},
      {src: 'assets/demo/ml-turns/turn14.mp3', at: [263.6, 309.2]}
    ]
  },
  duplex: {
    title: 'Know when to wait, enter, and answer',
    summary: 'Two full-duplex recordings. In the multi-party scene several people talk to each other, and the assistant holds back until it is actually addressed. In the second, the user sets the pace in words — asking the assistant to wait, then to continue — and the assistant follows that instruction rather than the silence.',
    variants: [
      {
        id: 'multiparty', label: 'Multi-party conversation', src: 'assets/demo/multiparty_stereo_2.mp3',
        caption: 'Several speakers talk among themselves; the assistant stays silent until the request is directed at it.',
        user: [[0.8, 5.9], [7.3, 20.6], [23.4, 27.3], [29.1, 30.6], [37.7, 44.1], [56.5, 59.3], [71.5, 74.2], [75.3, 79.5]],
        userCats: ['talking', 'background', 'addressed', 'background', 'interruption', 'background', 'background', 'background'],
        agent: [[29.2, 38.5], [46.1, 69.4]], duration: 81.4,
        events: [
          {at: 0.8, label: 'People talk among themselves; assistant stays out'},
          {at: 29.2, label: 'First assistant turn, entering only when addressed'},
          {at: 37.7, label: 'A speaker comes in while the assistant is talking'},
          {at: 46.1, label: 'Assistant answers after the overlap resolves'},
          {at: 71.5, label: 'Conversation returns to the human speakers'}
        ]
      },
      {
        id: 'semantic', label: 'Semantic Control', src: 'assets/demo/semantic_stereo_1.mp3',
        caption: 'The user asks the assistant to hold; the assistant waits through the pauses and resumes when released.',
        user: [[0.9, 5.9], [12.4, 13.0], [15.9, 16.5], [18.5, 24.8], [31.9, 36.6], [38.6, 43.5], [46.7, 52.6], [55.3, 56.8]],
        userCats: ['addressed', 'backchannel', 'backchannel', 'interruption', 'addressed', 'addressed', 'addressed', 'addressed'],
        agent: [[7.0, 19.4], [26.7, 30.9], [58.7, 98.0]], duration: 98.0,
        annos: [{seg: 3, text: 'Semantic control · setup'}, {seg: 7, text: 'Semantic control · turn release'}],
        events: [
          {at: 7.0, label: 'Assistant begins its reply'},
          {at: 18.5, label: 'User speaks over it and redirects'},
          {at: 26.7, label: 'Assistant acknowledges the new instruction'},
          {at: 31.9, label: 'Assistant holds while the user keeps talking'},
          {at: 58.7, label: 'Released, the assistant delivers the full answer'}
        ]
      }
    ],
    note: 'Speech-activity times are measured from the two channels of each recording: the left channel carries the user side, the right channel the assistant. Labels describe the interaction; they are not a transcript. The waveform strip is drawn from the decoded audio samples (peak per pixel column); a precomputed envelope stands in until decoding finishes.'
  },
  action: {
    title: 'Ask, execute, and fill in the gaps',
    summary: 'A spoken request becomes a tool call. The assistant resolves what the user actually said into arguments, asks for the missing detail instead of guessing, and reports back what the execution returned.',
    media: {type: 'video', src: 'assets/demo/tool_call.mp4', poster: null},
    points: [
      {title: 'Ground the request', text: 'Turn the spoken intent into a concrete tool call with checked arguments.'},
      {title: 'Ask, do not assume', text: 'Request the missing parameter rather than filling it with a guess.'},
      {title: 'Report the result', text: 'Describe what execution actually returned, not what was promised.'}
    ],
    note: 'Screen recording of a live session (40 s). Behavior depends on the tools configured in that session.'
  },
  persona: {
    title: 'A character to keep, a moment to meet',
    summary: 'Two sides of spoken expression: sustaining a literary character across a conversation, and responding to how something was said rather than only what was said.',
    cards: [
      {label: 'Persona · Jia Baoyu', src: 'assets/demo/persona_01_cosyvoice_01.mp3', text: 'Role-play as Jia Baoyu from Dream of the Red Chamber, holding the character\'s voice, manner, and register through the exchange.', tag: 'Character consistency'},
      {label: 'Empathy · everyday conversation', src: 'assets/demo/empathy_00_01.mp3', text: 'An emotionally loaded moment, where the acoustic cues — not just the words — shape what the assistant says next.', tag: 'Acoustic emotional cues'}
    ],
    note: 'Evaluated behavior for persona and empathy is reported in the benchmarks section (CharacterEval, RMTBench, PersonaCross, EchoMind).'
  }
};

const DEMO_ROOT = document.querySelector('#demo-panel');
if (DEMO_ROOT) {
  const time = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  const DUPLEX_CATS = {
    talking: 'Talking to other',
    background: 'Background speech',
    addressed: 'Addressed speech',
    backchannel: 'Backchannel',
    interruption: 'User interruption',
    semantic: 'Semantic control',
    resume: 'Resume after hold'
  };
  const LEGEND_ORDER = ['talking', 'background', 'addressed', 'backchannel', 'interruption', 'semantic', 'resume'];
  const usedCats = variant => [...new Set([...(variant.userCats || []), ...(variant.agentCats || [])].filter(Boolean))];
  const lane = (segments, duration, kind, cats) => segments.map(([start, end], index) => {
    const left = `${start / duration * 100}%`;
    const width = `${Math.max((end - start) / duration * 100, 0.7)}%`;
    const cat = cats && cats[index] ? ` cat-${cats[index]}` : '';
    const label = cats && cats[index] ? ' · ' + TS(DUPLEX_CATS[cats[index]]) : '';
    return `<span class="lane-block ${kind}${cat}" style="left:${left};width:${width}" title="${time(start)}–${time(end)}${label}"></span>`;
  }).join('');

  function renderDuplex(variant) {
    const bars = WAVEFORMS[variant.id].map(value => `<i style="height:${Math.max(2, Math.round(value * 100))}%"></i>`).join('');
    return `<div class="duplex-player" data-variant="${variant.id}">
      <div class="wave-strip" role="img" aria-label="Raw waveform of the recording over ${time(variant.duration)}. Click to seek.">
        <div class="wave-mono">${bars}</div>
        <div class="wave-playhead" hidden></div>
      </div>
      <audio controls preload="metadata" src="${variant.src}"></audio>
      <p class="demo-caption">${TS(variant.caption)}</p>
      <div class="lane-legend">${LEGEND_ORDER.filter(key => usedCats(variant).includes(key)).map(key => `<span><i class="sw-${key}"></i>${TS(DUPLEX_CATS[key])}</span>`).join('')}<span><i class="sw-agent"></i>${TS('Assistant turn')}</span></div>
      <div class="timeline" role="img" aria-label="Speech activity timeline: user and assistant channels over ${time(variant.duration)}">
        ${variant.annos ? `<div class="timeline-row anno-row"><span class="timeline-name"></span><div class="anno-track">${variant.annos.map(a => { const seg = variant.user[a.seg]; const mid = (seg[0] + seg[1]) / 2 / variant.duration * 100; return `<div class="anno" style="left:${mid}%"><span class="anno-text">${a.text}</span><span class="anno-arrow"></span></div>`; }).join('')}</div></div>` : ''}
        <div class="timeline-row"><span class="timeline-name user">Users</span><div class="timeline-track">${lane(variant.user, variant.duration, 'user', variant.userCats)}<div class="track-playhead" hidden></div></div></div>
        <div class="timeline-row"><span class="timeline-name agent">Assistant</span><div class="timeline-track">${lane(variant.agent, variant.duration, 'agent', variant.agentCats)}<div class="track-playhead" hidden></div></div></div>
      </div>
      <div class="timeline-scale">${[0, 0.25, 0.5, 0.75, 1].map(f => `<span>${time(variant.duration * f)}</span>`).join('')}</div>
      <ul class="event-list">${variant.events.map(event =>
        `<li><button class="event-seek" data-seek="${event.at}" data-variant="${variant.id}"><b>${time(event.at)}</b><span>${event.label}</span></button></li>`).join('')}</ul>
    </div>`;
  }

  const views = {
    multilingual: demo => `<div class="ml-full">
      <audio controls preload="none" src="${demo.media.src}"></audio>
      <div class="demo-tags">${demo.tags.map(tag => `<span>${TS(tag)}</span>`).join('')}</div>
      <p class="demo-channel">${TS(demo.media.channels)} · ${TS('full session')}</p>
    </div>
    <div class="ml-list">${demo.transcript.map((turn, index) => {
      const cut = demo.turns[index];
      return `<div class="ml-row ${turn.role}">
        <div class="ml-audio"><audio controls preload="none" src="${cut.src}"></audio><span class="ml-time">${time(cut.at[0])} – ${time(cut.at[1])} · turn ${index + 1}</span></div>
        <div class="ml-text"><span class="turn-meta"><b>${turn.role === 'user' ? 'User' : 'Assistant'}</b><i>${turn.lang}</i></span><p>${turn.text}</p></div>
      </div>`;
    }).join('')}</div>`,
    duplex: demo => `<div class="duplex-grid">${demo.variants.map(variant =>
      `<section class="duplex-card"><h4>${TS(variant.label)}</h4>${renderDuplex(variant)}</section>`).join('')}</div>`,
    action: demo => `<div class="demo-layout action-layout">
      <div class="demo-main"><video controls preload="metadata" playsinline src="${demo.media.src}"></video></div>
      <ol class="action-points">${demo.points.map((point, index) =>
        `<li><span>0${index + 1}</span><div><b>${TS(point.title)}</b><p>${TS(point.text)}</p></div></li>`).join('')}</ol>
    </div>`,
    persona: demo => `<div class="persona-grid">${demo.cards.map(card =>
      `<section class="persona-card"><span class="persona-tag">${TS(card.tag)}</span><h4>${TS(card.label)}</h4><p>${TS(card.text)}</p><audio controls preload="none" src="${card.src}"></audio></section>`).join('')}</div>`
  };

  let currentDemo = 'duplex';
  let currentAgent = 'cockpit';
  const peakCache = new Map();
  const decodedDuration = new Map();

  async function computePeaks(src, columns) {
    if (peakCache.has(src)) return peakCache.get(src);
    const bytes = await fetch(src).then(r => r.arrayBuffer());
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const buffer = await ctx.decodeAudioData(bytes);
    if (ctx.close) ctx.close();
    const mixed = Float32Array.from(buffer.getChannelData(0));
    for (let c = 1; c < buffer.numberOfChannels; c++) {
      const d = buffer.getChannelData(c);
      for (let i = 0; i < mixed.length; i++) mixed[i] = (mixed[i] + d[i]) / 2;
    }
    const per = Math.floor(mixed.length / columns);
    const peaks = new Float32Array(columns);
    for (let i = 0; i < columns; i++) {
      let m = 0;
      const off = i * per;
      for (let j = 0; j < per; j++) {
        const v = Math.abs(mixed[off + j]);
        if (v > m) m = v;
      }
      peaks[i] = m;
    }
    let mx = 0;
    for (const v of peaks) if (v > mx) mx = v;
    const norm = mx || 1;
    for (let i = 0; i < columns; i++) peaks[i] /= norm;
    peakCache.set(src, peaks);
    decodedDuration.set(src, buffer.duration);
    return peaks;
  }

  function paintWave(strip, peaks, width) {
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    const cols = Math.max(240, Math.min(peaks.length, Math.floor((width || 1200) * dpr)));
    const step = peaks.length / cols;
    let html = '';
    for (let i = 0; i < cols; i++) {
      let m = 0;
      const a = Math.floor(i * step);
      const b = Math.max(a + 1, Math.floor((i + 1) * step));
      for (let j = a; j < b; j++) if (peaks[j] > m) m = peaks[j];
      html += `<i style="height:${Math.max(1.5, m * 100).toFixed(1)}%"></i>`;
    }
    strip.querySelector('.wave-mono').innerHTML = html;
  }

  function seekAndPlay(audio, target) {
    if (audio.readyState >= 1) audio.currentTime = target;
    else audio.addEventListener('loadedmetadata', () => { audio.currentTime = target; }, {once: true});
    audio.play().catch(() => {});
  }

  function bindWavePlayers() {
    DEMO_ROOT.querySelectorAll('.duplex-player').forEach(player => {
      const audio = player.querySelector('audio');
      const strip = player.querySelector('.wave-strip');
      const head = player.querySelector('.wave-playhead');
      const variant = DEMOS.duplex.variants.find(v => v.id === player.dataset.variant);
      const move = () => {
        if (!audio.duration) return;
        const pct = `${audio.currentTime / audio.duration * 100}%`;
        head.hidden = false;
        head.style.left = pct;
        player.querySelectorAll('.track-playhead').forEach(ph => { ph.hidden = false; ph.style.left = pct; });
      };
      let raf = 0;
      const tick = () => { move(); raf = requestAnimationFrame(tick); };
      audio.addEventListener('play', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
      audio.addEventListener('pause', () => cancelAnimationFrame(raf));
      audio.addEventListener('ended', () => { cancelAnimationFrame(raf); move(); });
      audio.addEventListener('seeked', move);
      strip.addEventListener('click', event => {
        const rect = strip.getBoundingClientRect();
        const frac = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const dur = audio.duration || decodedDuration.get(variant.src);
        if (!dur) return;
        seekAndPlay(audio, frac * dur);
      });
      computePeaks(variant.src, 8000)
        .then(peaks => paintWave(strip, peaks, strip.clientWidth))
        .catch(() => {});
    });
    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => DEMO_ROOT.querySelectorAll('.wave-strip').forEach(strip => {
        const src = strip.closest('.duplex-player').querySelector('audio').getAttribute('src');
        const peaks = peakCache.get(src);
        if (peaks) paintWave(strip, peaks, strip.clientWidth);
      }), 200);
    });
  }

  function renderDemo(key) {
    currentDemo = key;
    const demo = DEMOS[key];
    DEMO_ROOT.innerHTML = `<header class="demo-header"><h3>${TS(demo.title)}</h3><p>${TS(demo.summary)}</p></header>${views[key](demo)}<p class="demo-note">${TS(demo.note)}</p>`;
    DEMO_ROOT.setAttribute('aria-labelledby', `demo-tab-${key}`);
    bindWavePlayers();
    document.querySelectorAll('[data-demo]').forEach(button => {
      const selected = button.dataset.demo === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }

  document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => renderDemo(button.dataset.demo)));
  DEMO_ROOT.addEventListener('click', event => {
    const seek = event.target.closest('[data-seek]');
    if (!seek) return;
    const player = DEMO_ROOT.querySelector(`[data-variant="${seek.dataset.variant}"] audio`);
    seekAndPlay(player, Number(seek.dataset.seek));
  });
  // One player at a time, so overlapping demos never compete.
  DEMO_ROOT.addEventListener('play', event => {
    DEMO_ROOT.querySelectorAll('audio, video').forEach(player => { if (player !== event.target) player.pause(); });
  }, true);
  const AGENT_DEMOS = {
    service: {title: 'Customer service', src: 'assets/agent/customer-service.mp4?v=2', caption: 'Full-session recording · customer service scenario.'},
    office: {title: 'Office', src: 'assets/agent/office.mp4', caption: 'Full-session recording · office productivity scenario.'},
    cockpit: {title: 'Smart cockpit', src: 'assets/agent/smart-cockpit.mp4', caption: 'Full-session recording · in-car smart cockpit scenario.'}
  };
  const AGENT_PANEL = document.querySelector('#agent-demo-panel');
  function renderAgentDemo(key) {
    if (!AGENT_PANEL) return;
    currentAgent = key;
    const demo = AGENT_DEMOS[key];
    AGENT_PANEL.innerHTML = `<section class="agent-demo-card${key === 'service' ? ' tall' : ''}"><h4>${TS(demo.title)}</h4><video controls preload="metadata" playsinline src="${demo.src}"></video><p class="demo-caption">${TS(demo.caption)}</p></section>`;
    AGENT_PANEL.setAttribute('aria-labelledby', `agent-tab-${key}`);
    document.querySelectorAll('[data-agent-demo]').forEach(button => {
      const selected = button.dataset.agentDemo === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }
  document.querySelectorAll('[data-agent-demo]').forEach(button => button.addEventListener('click', () => renderAgentDemo(button.dataset.agentDemo)));
  renderDemo('duplex');
  renderAgentDemo('cockpit');
  window.__rerenderers.push(() => { renderDemo(currentDemo); renderAgentDemo(currentAgent); });
}
