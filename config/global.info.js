const { makeDate } = require("../libs/functions/myFunc");
const cryptoRandomString = require("crypto-random-string");

const { shopMenu } = require("./dataShop");

const keyMaker = cryptoRandomString(5).toUpperCase();

const indexMenu = {
  category: [
    "Owner Command",
    "General",
    "Open Ai",
    "Downloader",
    "Searcher",
    "Islami",
    "Games & Quiz",
    "NSFW Menu",
    "Other",
  ],
  features: {
    downloader: [
      {
        title: "Facebook",
        cmd: "cpanel facebook",
        desc: "Mendownload video via link facebook",
      },
      {
        title: "Instagram",
        cmd: "cpanel instagram",
        desc: "Mendownload video via link instagram",
      },
      {
        title: "Tiktok",
        cmd: "cpanel tiktok",
        desc: "Mendownload video/aidio via link tiktok",
      },
      {
        title: "Tiktok Music",
        cmd: "cpanel tiktokmusic",
        desc: "Mendownload video/aidio via link tiktok",
      },
      {
        title: "Youtube Search",
        cmd: "cpanel ytsearch",
        desc: "Mencari Video Youtube hasil berupa link URL",
      },
      {
        title: "Youtube MP3 / Audio",
        cmd: "cpanel ytmp3",
        desc: "Mendownload audio via link youtube",
      },
      {
        title: "Youtube MP4 / Video",
        cmd: "cpanel ytmp4",
        desc: "Mendownload video via link youtube",
      },
      {
        title: "Joox",
        cmd: "cpanel joox",
        desc: "Mencari & Mendownload audio musik via joox",
      },
      {
        title: "Zippyshare",
        cmd: "cpanel zippyshare",
        desc: "Membypass link url link zippyshare tanpa iklan",
      },
    ],
    searcherAndEdu: [
      {
        title: "Wikipedia",
        cmd: "cpanel wikipedia",
        desc: "Mencari sesuatu via wikipedia",
      },
      {
        title: "Roboguru",
        cmd: "cpanel roboguru",
        desc: "Mencari sesuatu via roboguru",
      },
      {
        title: "Brainly",
        cmd: "cpanel brainly",
        desc: "Mencari sesuatu via brainly",
      },
    ],
    openAi: [
      {
        title: "Open Ai",
        cmd: "openai",
        desc: "Deskrisi & Bantuan Fitur Chat OpenAi",
      },
      {
        title: "Open Ai - Davinci",
        cmd: "davinci",
        desc: "Chat OpenAi paling powerfull dengan model Davinci *waktu proses sedikit lama",
      },
      {
        title: "Open Ai - Curie",
        cmd: "curie",
        desc: "Chat OpenAi paling enteng dan respon cepat dengan model Curie",
      },
      {
        title: "Open Ai - Codex",
        cmd: "codex",
        desc: "Menginspeksi / membuat kode pemrogaman.",
      },
      {
        title: "Open Ai - DALL-E",
        cmd: "dalle",
        desc: "Membuat gambar bserdasarkan masukan perintah.",
      },
    ],
    nsfw: [
      {
        title: "List Lewd Menu",
        cmd: "lewd",
        desc: "Membuka list gambar lewd yang tersedia",
      },
      {
        title: "Nekopoi Search",
        cmd: "cpanel nekopoisearch",
        desc: "Mencari hentai/JAV via website Nekopoi",
      },
      {
        title: "Nekopoi - Hentai / JAV",
        cmd: "cpanel nekopoi",
        desc: "Mencari hentai/JAV via website Nekopoi berdasarkan link",
      },
      {
        title: "Nhentai",
        cmd: "cpanel nhentai",
        desc: "Mencari doujin & detailnya via website Nhentai",
      },
      {
        title: "Nhentai PDF",
        cmd: "cpanel nhentaipdf",
        desc: "Mencari & mendownload file pdf berdasarkan kode yang diberikan",
      },
    ],
    gamesAndQuiz: [
      {
        title: "Honkai Impact : Elysian Realm Signet",
        cmd: "er",
        desc: "List Character & Recommended Signet Pick",
      },
      {
        title: "Genshin Impact : Character Mats",
        cmd: "sheet",
        desc: "List Character & Mats Information",
      },
      {
        title: "Genshin Impact : Character Build",
        cmd: "sheet2",
        desc: "List Character & Build recommendation",
      },
      {
        title: "Asah Otak",
        cmd: "asahotak",
        desc: "Fun Quiz Game",
      },
      {
        title: "Tebak Gambar",
        cmd: "tebakgambar",
        desc: "Fun Quiz Game",
      },
    ],
    islami: [
      {
        title: "Asnaulhusna",
        cmd: "cpanel asmaulhusna",
        desc: "Kumpulan asmaulhusna",
      },
      {
        title: "Jadwal Sholat",
        cmd: "cpanel jadwalsholat",
        desc: "Jadwal sholat di berbagai tempat",
      },
      {
        title: "Quran",
        cmd: "cpanel quran",
        desc: "Mencari ayat & terjemahan Quran",
      },
    ],
    general: [
      {
        title: "Register",
        cmd: "cpanel daftar",
        desc: "Daftar agar bisa menggunakan Bot.",
      },
      {
        title: "My Profile",
        cmd: "myprofile",
        desc: "Lihat dan Cek profil & identitas Kamu",
      },
      {
        title: "My Stats",
        cmd: "mystats",
        desc: "Lihat data statistik penggunaan Kamu",
      },
      {
        title: "My Store",
        cmd: "mystore",
        desc: "Membuka list database yang Kamu simpan",
      },
      {
        title: "Claim / Redeem Code",
        cmd: "redeem",
        desc: "Claim kode agar dapat limit!",
      },
    ],
    owner: [
      {
        title: "Get All Users",
        cmd: "users",
        desc: "Display List of All Users",
      },
      {
        title: "Inspect",
        cmd: "inspect",
        desc: "Inspect Users individual data",
      },
      {
        title: "Item Management",
        cmd: "item",
        desc: "Display List, add, and edit Global Item Data",
      },
      {
        title: "Setter Users Data",
        cmd: "set",
        desc: "Modify Users Limit & Status Ban",
      },
    ],
    misc: [
      {
        title: "ouo",
        cmd: "cpanel ouo",
        desc: "Membypass link ouo tanpa melewati iklan",
      },
      {
        title: "ouo",
        cmd: "cpanel shortlink",
        desc: "Membuat link menjadi lebih pendek",
      },
    ],
  },
};

const initialStoreInput = {
  itemData: [
    {
      type: "LOREM",
      value: "IPSUM",
      date: makeDate(),
    },
  ],
  usage: [
    {
      usage: "initiate",
      date: makeDate(),
    },
  ],
  openAi: [
    {
      key: keyMaker,
      cmd: "gethistory" + " " + keyMaker,
      alias: "Hello World!",
      answer: "Hello too!",
      created: makeDate(),
    },
  ],
  images: [
    {
      key: keyMaker,
      cmd: "getimages" + " " + keyMaker,
      alias: "Hallo Isekai!, *inisiasi awal penyimpanan.",
      imageUrl:
        "https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/picture/img-azusa-main.jpeg",
      created: makeDate(),
    },
  ],
  documents: [
    {
      key: keyMaker,
      cmd: "getdocs" + " " + keyMaker,
      alias: "Youkoso Isekai!, *inisiasi awal penyimpanan.",
      docs: "Et proident anim minim fugiat officia.",
      created: makeDate(),
    },
  ],
};

const lewdContainer = [
  {
    title: "ahegao",
    cmd: "random/nsfw ahegao",
  },
  {
    title: "armpits",
    cmd: "random/nsfw armpits",
  },
  {
    title: "booty",
    cmd: "random/nsfw booty",
  },
  {
    title: "feets",
    cmd: "random/nsfw feets",
  },
  {
    title: "thighss",
    cmd: "random/nsfw thighss",
  },
  {
    title: "bigtiddies",
    cmd: "random/nsfw bigtiddies",
  },
  {
    title: "ecchi",
    cmd: "random/nsfw ecchi",
  },
  {
    title: "ero",
    cmd: "random/nsfw ero",
  },
  {
    title: "trap",
    cmd: "random/nsfw trap",
  },
  {
    title: "waifu",
    cmd: "random/nsfw waifu",
  },
  {
    title: "yaoi",
    cmd: "random/nsfw yaoi",
  },
  {
    title: "erofeet",
    cmd: "random/nsfw erofeet",
  },
  {
    title: "hentai",
    cmd: "random/nsfw hentai",
  },
  {
    title: "hentaifemdom",
    cmd: "random/nsfw hentaifemdom",
  },
  {
    title: "hololewd",
    cmd: "random/nsfw hololewd",
  },
  {
    title: "lewdanimegirls",
    cmd: "random/nsfw lewdanimegirls",
  },
  {
    title: "milf",
    cmd: "random/nsfw milf",
  },
  {
    title: "neko",
    cmd: "random/nsfw neko",
  },
  {
    title: "sideoppai",
    cmd: "random/nsfw sideoppai",
  },
  {
    title: "anal",
    cmd: "random2 anal",
  },
  {
    title: "bj",
    cmd: "random2 bj",
  },
  {
    title: "blowjob",
    cmd: "random2 blowjob",
  },
  {
    title: "classic",
    cmd: "random2 classic",
  },
  {
    title: "cum",
    cmd: "random2 cum",
  },
  {
    title: "erokemo",
    cmd: "random2 erokemo",
  },
  {
    title: "eroyuri",
    cmd: "random2 eroyuri",
  },
  {
    title: "feetg",
    cmd: "random2 feetg",
  },
  {
    title: "femdom",
    cmd: "random2 femdom",
  },
  {
    title: "futanari",
    cmd: "random2 futanari",
  },
  {
    title: "random_hentai_gif",
    cmd: "random2 random_hentai_gif",
  },
  {
    title: "holoero",
    cmd: "random2 holoero",
  },
  {
    title: "keta",
    cmd: "random2 keta",
  },
  {
    title: "kuni",
    cmd: "random2 kuni",
  },
  {
    title: "lewd",
    cmd: "random2 lewd",
  },
  {
    title: "lewdk",
    cmd: "random2 lewdk",
  },
  {
    title: "lewdkemo",
    cmd: "random2 lewdkemo",
  },
  {
    title: "nsfw_neko_gif",
    cmd: "random2 nsfw_neko_gif",
  },
  {
    title: "pussy",
    cmd: "random2 pussy",
  },
  {
    title: "solo",
    cmd: "random2 solo",
  },
  {
    title: "tits",
    cmd: "random2 tits",
  },
  {
    title: "yuri",
    cmd: "random2 yuri",
  },
];

const Lewd = {
  typeA: [
    "ahegao",
    "armpits",
    "booty",
    "feets",
    "thighss",
    "bigtiddies",
    "ecchi",
    "ero",
    "trap",
    "waifu",
    "yaoi",
    "erofeet",
    "hentai",
    "hentaifemdom",
    "hololewd",
    "lewdanimegirls",
    "milf",
    "neko",
    "sideoppai",
  ],
  typeB: [
    "anal",
    "bj",
    "blowjob",
    "classic",
    "cum",
    "erokemo",
    "eroyuri",
    "feetg",
    "femdom",
    "futanari",
    "random_hentai_gif",
    "holoero",
    "keta",
    "kuni",
    "lewd",
    "lewdk",
    "lewdkemo",
    "nsfw_neko_gif",
    "pussy",
    "solo",
    "tits",
    "yuri",
  ],
};

const davinci = `Davinci adalah model AI paling tangguh yang bisa melakukan semua tugas yang bisa dilakukan oleh model lain dan sering kali dengan instruksi yang lebih sedikit.
Untuk aplikasi yang membutuhkan pemahaman yang baik terhadap konten, seperti ringkasan untuk audiens tertentu dan pembuatan konten kreatif, Davinci akan menghasilkan hasil terbaik.

Kemampuan ini membutuhkan sumber daya komputasi yang lebih besar, sehingga biaya per panggilan API Davinci lebih mahal dan tidak secepat model lain.
Hal lain yang membuat model ini bagus adalah dalam memahami maksud teks.

Davinci cukup baik dalam menyelesaikan banyak jenis masalah logika dan menjelaskan motif karakter.
Davinci telah mampu menyelesaikan beberapa masalah AI yang paling sulit yang melibatkan akibat dan sebab.

"*Davinci bagus dalam: maksud yang kompleks, kausalitas/sebab dan akibat, ringkasan untuk audiens."*`;

const curie = `Curie sangat kuat, namun sangat cepat.

Sementara Davinci lebih kuat dalam menganalisis teks yang rumit, Curie cukup mampu untuk banyak tugas bernuansa seperti klasifikasi dan peringkasan sentimen.
Curie juga cukup pandai menjawab pertanyaan dan melakukan Q&A dan sebagai chatbot layanan umum.

*"Curie bagus dalam: Terjemahan bahasa, klasifikasi kompleks, sentimen teks, peringkasan"*`;

const codex = `Model Codex paling mumpuni.
Sangat pandai menerjemahkan bahasa alami ke kode. Selain melengkapi kode, juga mendukung penyisipan penyelesaian di dalam kode.
`;

const dall_e = `Membuat gambar dari awal berdasarkan prompt teks
Semakin detail deskripsinya, semakin besar kemungkinan Kamu mendapatkan hasil yang Kamu inginkan.`;

const requestModelExample = {
  davinci: [
    "*.davinci* Apa itu kripto atau bisnis kripto?, jika saya memungkinkan, dapatkah saya berbisnis kripto? apa saja yang harus dipersipkan?",
    "*.davinci* Solusi apa yang memungkinkan agar manusia dapat hidup selama mungkin?",
    "*.davinci* Saya mempunyai bebrapa tipe data penelitian, diantaranya yaitu value stream mapping, fishbone, dan metode agregasi. Tipe data manakah yang tepat jika saya ingin memfokuskan untuk meneliti dengan lingkup manajemen?",
    "*.davinci* Apakah di jaman berteknologi sekarang manusia sudah sepenuhnya makmur dan sejahtera? apakah memungkinkan jika manusia nantinya menemukan sebuah utopia kelak di masa yang akan datang?",
  ],
  curie: [
    "*.curie* Siapakah presiden pertama Negara Rusia?",
    "*.curie* Berapakah lama ekspektansi masa hidup manusia jika pola hidupnya baik maupun buruk?",
    "*.curie* Perusahaan amazon didirikan oleh siapa dan kapan?",
  ],
  codex: [
    "*.codex* Apa itu bahasa pemrogaman phyton?, berikan saya contoh kecilnya",
    "*.codex* Buatkan halaman website sederhana dengan hanya menggunakan html dan css",
    "*.codex* Berikan saya contoh kecil pemrogaman java berbasis OOP",
    "*.codex* Berikan contoh perbedaan php native dan laravel, berikan juga contoh sintaksnya",
  ],
  dalle: [
    "*.dalle* potret fotografi studio dari dekat kucing siam putih yang terlihat penasaran, telinga dengan cahaya latar",
    "*.dalle* astronot yang sedang bermain bola voli diatas permukaan bulan, dengan latar planet bumi dan cuaca yang cerah",
    "*.dalle* sebuah pemandangan air terjun dengan air yan berwarna biru langit serta memancarkan cahaya pelangi diatasnya",
  ],
};

const openAiHelper = {
  models: {
    davinci,
    curie,
    codex,
    dall_e,
  },
  requestModelExample,
};

module.exports = {
  indexMenu,
  shopMenu,
  initialStoreInput,
  lewdContainer,
  Lewd,
  openAiHelper,
};
