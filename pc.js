/* ============================================================
   Radio Argentina - version PC (radio de madera)
   Streams publicos de radios argentinas. Interfaz igual a la imagen
   de referencia: ver pc.html / pc.css (escenario de 1536 x 1024).
   ============================================================ */
'use strict';
const STATIONS = [
   {
    id: "radiotop",
    name: "Radio Top",
    freq: "FM 105.9",
    url: "https://live-ar1.cdnrad.com/hls/radio-2075/live.m3u8"
  },
   {
    id: "Pobre Johnny",
    name: "Radio Pobre Johnny",
    freq: "FM 88.9",
    url: "https://stream4.suenas.net/pobrejohnny"
  },
  /* ===== Chaco (agregadas) ===== */
  {
    id: "El mañanero",
    name: "El mañanero V.Beta",
    freq: "FM 97.5",
    // Stream detectado en la captura. Es HTTP; requiere proxy HTTPS para GitHub Pages.
    url: "https://streaming.radiosenlinea.com.ar/9464/stream"
  },
   {
    id: "FM libertad Machagai",
    name: "FM Libertad Machagai",
    freq: "FM 99.5",
    // Stream detectado en la captura. Es HTTP; requiere proxy HTTPS para GitHub Pages.
    url: "http://streaming01.shockmedia.com.ar/8428/stream"
  },
   {
    id: "VIP FM",
    name: "Vip Radio Machagai",
    freq: "FM 104.9",
    url: "https://s2.netradiofm.com:5416/stream/?type=http&nocache=1"
  },
  {
    id: "Master FM",
    name: "Master FM Machagai",
    freq: "102.5",
    url: "https://ssl2.veemesoft.com.ar/a5ded807684d25c964b2"
  },
   {
    id: "Cristalfm",
    name: "FM Cristal Machagai",
    freq: "FM 91.5",
    url: "https://srv3.deradios.stream:7039/;"
  },
  {
    id: "laradio1047",
    name: "La Radio 104.7",
    freq: "FM 104.7",
    url: "https://server.laradio.online/proxy/laradio1047?mp=/stream"
  },
  {
    id: "facundoquiroga",
    name: "Facundo Quiroga",
    freq: "FM 95.9",
    url: "https://01.solumedia.com.ar:9038/stream"
  },
  {
    id: "radiofan",
    name: "Radio Fan",
    freq: "FM 96.9",
    url: "https://streaming5.locucionar.com/proxy/radiofan969?mp=/stream"
  },
  {
   id: "WALTER FM",
    name: "Radio WALTER 80/90",
    freq: "Online",
    url: "https://stream.zeno.fm/qoxmfycvaftvv"
  },
  {
    id: "Ñande Reko Radio",
    name: "Ñande Reko Radio",
    freq: "Online",
    url: "https://devnec.com:8001/radio62"
  },
   {
    id: "fmuniversochamame",
    name: "Fm Universo Chamame",
    freq: "online",
    url: "https://streaming01.radiosenlinea.com.ar/9392/stream"
  },
   {
   id: "Polca Paraguaya",
    name: "Polca Paraguaya",
    freq: "Online",
    url: "https://stream.zeno.fm/tvsx850x1f8uv"
  },
  {
    id: "Retro FM",
    name: "Retro FM",
    freq: "Online",
    url: "https://argentina.shockmedia.com.ar:8018/stream"
  }, 
{
    id: "Radio Mocovl AM 800",
    name: "Radio Mocovl AM 800",
    freq: "AM 800",
    url: "https://live-ar1.cdnrad.com/hls/radio-1930/live.m3u8"
  },
   {
    id: "radiomaria",
    name: "Radio Maria",
    freq: "online",
    url: "https://dreamsiteradiocp2.com/proxy/rmargentina2?mp=/stream"
  },
  {
    id: "Futuro",
    name: "Radio Futuro",
    freq: "FM 99.9",
    url: "https://edge03.radiohdvivo.com/futuro989"
  },
  {
    id: "Radio Con Vos",
    name: "Radio Con Vos",
    freq: "FM 89.9",
    url: "https://server1.stweb.tv/rcvos/live/playlist.m3u8"
  },
  {
    id: "lra26",
    name: "Nacional Resistencia",
    freq: "AM 620",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad26"
  },
  {
    id: "fmgualamba",
    name: "FM Gualamba",
    freq: "FM 93.7",
    url: "https://ssl.radiosnethosting.com/index.php?port=9072"
  },
  /* ===== Tus radios de siempre (sin tocar) ===== */
  {
    id: "nacional",
    name: "Nacional",
    freq: "AM 870",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad1"
  },
   {
    id: "Lentos de Todos Los Tiempos",
    name: "Lentos de Todos Los Tiempos",
    freq: "Online",
    url: "https://s3.conectarmedia.com:8016/stream"
  },
  {
    id: "FM Milenium ",
    name: "FM Milenium ",
    freq: "106.7",
    url: "https://sonicpanel.hostradios.com/8002/stream"
  },
  {
    id: "Vale 97.5",
    name: "Vale 97.5",
    freq: "FM 95.5",
    url: "https://vale.stweb.tv/vale/live/playlist.m3u8"
  },
  {
    id: "mitre",
    name: "Mitre",
    freq: "AM 790",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM790_56AAC.aac"
  },
  {
    id: "rockpop",
    name: "Rock & Pop",
    freq: "FM 95.9",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ROCKANDPOPAAC.aac"
  },
  {
    id: "aspen",
    name: "Aspen",
    freq: "FM 102.3",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ASPEN.mp3"
  },
  {
    id: "metro",
    name: "Metro",
    freq: "FM 95.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO.mp3"
  },
  {
    id: "lared",
    name: "La Red",
    freq: "AM 910",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/LA_RED_AM910AAC.aac"
  },
  {
    id: "urbana",
    name: "Urbana Play",
    freq: "FM 104.3",
    url: "https://cdn.instream.audio:9660/stream"
  },
  {
    id: "am750",
    name: "AM 750",
    freq: "AM 750",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM750AAC.aac"
  },

  /* ===== Nuevas ===== */
  {
    id: "doradofm",
    name: "Dorado FM",
    freq: "FM 98.3",
    url: "https://sslstream.online:7269/stream"
  },
   {
    id: "Radio Chamame",
    name: "Radio Chamame",
    freq: "Online",
    url: "https://stream.zenolive.com/84y7b87p4gruv"
  },
  {
    id: "Pasionfm",
    name: "Pasion Fm",
    freq: "FM 98.7",
    url: "https://live-ar1.cdnrad.com/hls/radio-2009/live.m3u8"
  },
   {
    id: "Esto es KchaK",
    name: "Esto es KchaK",
    freq: "Online",
    url: "https://stream.zeno.fm/kd0p50swchruv"
  },
   {
    id: "Radio Welo el 5to Bronco",
    name: "Radio Welo el 5to Bronco",
    freq: "Online",
    url: "https://server01.heplayer.com/8052/;"
  },
  {
    id: "Las Lomitas",
    name: "Nacional Las Lomitas Formosa",
    freq: "AM 1270",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad20"
  },
    {
    id: "Sentir FM",
    name: "Sentir FM",
    freq: "FM 98.3",
    url: "https://stream.zeno.fm/uwqe3chde78uv"
  },
   {
    id: "Cadena Heat",
    name: "Heat FM",
    freq: "FM 91.9",
    url: "https://24403.live.streamtheworld.com/CADENAHEAT_SC"
  },

  /* ===== AM de Buenos Aires ===== */
  {
    id: "madre",
    name: "Radio Madre",
    freq: "AM 530",
    url: "https://cdn.instream.audio:9288/stream" // ⚠  la lista original estaba en http; la pasé a https
  },
  {
    id: "radioargentina",
    name: "Radio Argentina",
    freq: "AM 570",
    url: "https://server.laradio.online:15224/live.mp3"
  },
  {
    id: "continental",
    name: "Continental",
    freq: "AM 590",
    url: "https://edge03.radiohdvivo.com/continental"
    // alternativa si falla: https://edge01.radiohdvivo.com/continental
  },
  {
    id: "rivadavia",
    name: "Rivadavia",
    freq: "AM 630",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RIVADAVIAAAC.aac"
  },
  {
    id: "cooperativa",
    name: "Cooperativa",
    freq: "AM 770",
    url: "https://cdn.instream.audio:9582/stream"
  },
  {
    id: "zonica",
    name: "Radio Zonica",
    freq: "AM 820",
    url: "https://streamlky.alsolnet.com/radiozonica"
  },
  {
    id: "delpueblo",
    name: "Del Pueblo",
    freq: "AM 830",
    url: "https://streaming6.locucionar.com:24248/stream"
  },
  {
    id: "cnnradio",
    name: "CNN Radio",
    freq: "AM 950",
    url: "https://unlimited2-ar.dps.live/cnn-ar/aac/icecast.audio"
  },
  {
    id: "genesis",
    name: "Genesis",
    freq: "Fm 101.5",
    url: "https://streaming1.locucionar.com/proxy/fmgenesis1015?mp=/stream"
  },
  {
    id: "la990",
    name: "La 990",
    freq: "AM 990",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM990AAC.aac"
  },
  {
    id: "ondalatina",
    name: "Onda Latina",
    freq: "AM 1010",
    url: "https://streaming2.locucionar.com/proxy/ondalatina?mp=/stream"
  },
  {
    id: "delplata",
    name: "Del Plata",
    freq: "AM 1030",
    url: "https://streaming01.shockmedia.com.ar:10586/stream"
  },
  {
    id: "guemes",
    name: "Güemes",
    freq: "AM 1050",
    url: "https://server.radiostreaming.com.ar/8564/stream"
  },
  {
    id: "delaciudad",
    name: "De la Ciudad",
    freq: "AM 1110",
    url: "https://radio01.ferozo.com/proxy/ra01001160?mp=/stream"
  },
  {
    id: "federal",
    name: "Radio Federal",
    freq: "AM 1180",
    url: "https://sonic.host-live.com/8176/stream"
  },
  {
    id: "radiosur",
    name: "Radio Sur",
    freq: "AM 1200",
    url: "https://stream.xweb.ar:8008/"
  },
  {
    id: "ecomedios",
    name: "Eco Medios",
    freq: "AM 1220",
    url: "https://stream-159.zeno.fm/uv3vkhw2qvduv"
  },

  /* ===== FM de Buenos Aires (CABA) ===== */
  {
    id: "blackie",
    name: "Blackie",
    freq: "FM 89.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/BLACKIE_89_1.mp3"
  },
  {
    id: "arpeggio",
    name: "Arpeggio",
    freq: "FM 89.5",
    url: "https://cloudstream2032.conectarhosting.com/8074/stream"
  },
  {
    id: "laboca",
    name: "La Boca",
    freq: "FM 90.1",
    url: "https://s24.myradiostream.com/14984/listen.mp3"
  },
  {
    id: "delta",
    name: "Delta",
    freq: "FM 90.3",
    url: "https://cdn.instream.audio/:9069/stream"
  },
  {
    id: "vorterix",
    name: "Vorterix",
    freq: "FM 92.1",
    url: "https://ice2.edge-apps.net/radio1_high-20057.audio"
  },
  {
    id: "nacionalrock",
    name: "Nacional Rock",
    freq: "FM 93.7",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad39" // ⚠  mismo patrón que tu Nacional AM 870
  },
  {
    id: "disney",
    name: "Radio Disney",
    freq: "FM 94.3",
    url: "https://27353.live.streamtheworld.com/DISNEY_ARG_BA_ADP/HLS/playlist.m3u8?dist=web-radiodisney" // ⚠  link viejo, puede estar caído
  },
  {
    id: "concepto",
    name: "Concepto",
    freq: "FM 95.5",
    url: "https://radios.solumedia.com:6002/stream"
  },
  {
    id: "nacionalclasica",
    name: "Nacional Clasica",
    freq: "FM 96.7",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad37"
  },
  {
    id: "infobae",
    name: "Infobae",
    freq: "FM 97.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/INFOBAEAAC.aac"
  },
  {
    id: "La mega",
    name: "La Mega",
    freq: "FM 98.3",
    url: "https://mega.stweb.tv/mega983/live/playlist.m3u8"
  },
  {
    id: "nacionalfolklorica",
    name: "Nacional Folklorica",
    freq: "FM 98.7",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad38"
  },
  {
    id: "la100",
    name: "La 100",
    freq: "FM 99.9",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM999_56.mp3"
  },
  {
    id: "blue",
    name: "Blue FM",
    freq: "FM 100.7",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/BLUE_FM_100_7AAC.aac"
  },
  {
    id: "dsports",
    name: "D Sports",
    freq: "FM 103.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/DSPORTSRADIOAAC_SC"
    // en días de partido a veces la bloquean por derechos
  },
  {
    id: "sonido",
    name: "Sonido",
    freq: "FM 103.5",
    url: "https://streaming.radiosenlinea.com.ar/8780/stream/1/"
  },
  {
    id: "lnmusica",
    name: "LN+ Musica",
    freq: "FM 104.9",
    url: "https://stream.radio.co/s2ed3bec0a/listen"
  },
  {
    id: "los40",
    name: "Los 40",
    freq: "FM 105.5",
    url: "https://radios.solumedia.com:6158/stream?icy=http"
  },
  {
    id: "pasion",
    name: "Radio Pasion",
    freq: "FM 102.7",
    url: "https://live-ar1.cdnrad.com/hls/radio-1969/live.m3u8"
  },
  {
    id: "berlin",
    name: "Radio Berlin",
    freq: "FM 107.9",
    url: "https://unlimited5-us.dps.live/berlin/aac/icecast.audio"
  },

  /* ===== Córdoba ===== */
  {
    id: "cadena3am",
    name: "Cadena 3",
    freq: "AM 700",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM700.mp3"
  },
  {
    id: "cadena3fm",
    name: "Cadena 3 FM",
    freq: "FM 100.5",
    url: "https://liveradio.mediainbox.net/radio3.mp3"
  },
  {
    id: "fmcordoba",
    name: "FM Cordoba",
    freq: "FM 91.9",
    url: "https://liveradio.mediainbox.net/fmcordoba.mp3"
  },
  {
    id: "suquia",
    name: "Radio Suquía",
    freq: "FM 96.5",
    url: "https://streaming01.shockmedia.com.ar:10945/"
  },
  {
    id: "mia",
    name: "Radio Mía",
    freq: "FM 104.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM1041_56AAC.aac"
  },
  {
    id: "unicordoba",
    name: "Radio Universidad Cordoba",
    freq: "AM 580",
    url: "https://radios.solumedia.com:10976/stream"
  },

  /* ===== Santa Fe y Rosario ===== */
  {
    id: "lt3",
    name: "LT3 Rosario",
    freq: "AM 680",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/LT3AAC_SC"
  },
  {
    id: "lt10",
    name: "LT10 Radio UNL",
    freq: "FM 97.3",
    url: "https://radio.arcast.net:1060/stream"
  },

  /* ===== Mendoza ===== */
  {
    id: "estaciondelsol",
    name: "Estacion del Sol",
    freq: "FM 96.7",
    url: "https://estaciondelsolonline.com.ar:8000/radio.aac"
  },

  /* ===== Buenos Aires (interior) ===== */
  {
    id: "lu9",
    name: "LU9 Mar del Plata",
    freq: "AM 670",
    url: "https://servidor1.hostradios.com:8110/stream"
  },
  {
    id: "lu2",
    name: "LU2 Bahia Blanca",
    freq: "AM 840",
    url: "https://streaming6.locucionar.com:24228/stream?ver=22915"
  },

  /* ===== Patagonia ===== */
  {
    id: "lu19",
    name: "LU19 Cipolletti",
    freq: "AM 690",
    url: "https://sonic.host-live.com/8064/stream"
  },
  {
    id: "fmlaredonda",
    name: "Fm la redonda Solo Futbol",
    freq: "FM 100.3",
    url: "https://01.solumedia.com.ar:8290/stream"
  },
  {
    id: "laredneuquen",
    name: "La Red Neuquen",
    freq: "FM 93.7",
    url: "https://server.laradio.online/proxy/julian_liyo?mp=/stream"
  },
  {
    id: "radio3trelew",
    name: "Radio 3 Trelew",
    freq: "ONLINE",
    url: "https://radio01.ferozo.com/proxy/ra01000981?mp=/stream"
  },
  {
    id: "fmdelmar",
    name: "FM Del Mar",
    freq: "ONLINE",
    url: "https://icecast.gesatel.com.ar:8443/vivo"
  },

  /* ===== Misiones ===== */
  {
    id: "radiolight",
    name: "Radio Light",
    freq: "FM 88.9",
    url: "https://streamall.alsolnet.com/radiolightfm" // ⚠  el link original estaba en http; lo pasé a https
  },

  /* ===== Solo online ===== */
  {
    id: "purorocknaciona",
    name: "Puro rock naciona",
    freq: "103.5",
    url: "https://srv591.grupomultimedios.com.ar:9902/radio/8110/radio.mp3?t=1794530808506"
  },
  {
    id: "FOLKLORE RADIO",
    name: "DEL PUEBLO MIO FOLKLORE RADIO",
    freq: "ONLINE",
    url: "https://centova.heplayer.com/proxy/dpmfolklore/stream"
  },
  {
    id: "Radio 10",
    name: "Radio 10",
    freq: "ONLINE",
    url: "https://stream.zeno.fm/4r530f2a9f0uv"
  },
   {
    id: "Radio Latina 101.1",
    name: "Radio Latina 101.1",
    freq: "ONLINE",
    url: "https://stream-gtlc.telecentro.net.ar/hls/radiolatinahls/0/playlist.m3u8?uid=c787e307dd6c302dc3e51a7d2b5df6f4"
  },
   {
    id: "FM Sentir",
    name: "FM sentir II",
    freq: "FM 104.3",
    // Stream detectado en la captura. Es HTTP; requiere proxy HTTPS para GitHub Pages.
    url: "https://fm-sentir-audio-proxy-production.up.railway.app/sentir"
  },
  {
    id: "eldesta",
    name: "El Destape Radio",
    freq: "ONLINE",
    url: "https://live-ar1.cdnrad.com/hls/radio-2123/live.m3u8"
  },

  /* ===== Agregadas desde MyRadioEnVivo (APK) ===== */
  {
    id: "delsur",
    name: "Radio Del Sur",
    freq: "FM 90.5",
    url: "https://cdn1.tvlin.net/icecast/radiodelsuraudio/icecast.audio"
  },
  {
    id: "fmvida",
    name: "FM Vida",
    freq: "FM 97.9",
    url: "https://streaming450tb.locucionar.com/proxy/fmvida979?mp=/stream"
  },
  {
    id: "miafm",
    name: "Mía FM",
    freq: "FM 104.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM1041_56AAC.aac"
  },
  {
    id: "mucha",
    name: "Mucha Radio",
    freq: "FM 103.7",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/MUCHA_RADIO.mp3"
  },
  {
    id: "am530",
    name: "AM 530 Somos Radio",
    freq: "AM 530",
    url: "https://ipanel.instream.audio:7000/stream"
  },
  {
    id: "colonia",
    name: "Radio Colonia",
    freq: "AM 550",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/COLONIA_SC"
  },
  {
    id: "laplata965",
    name: "96.5 La Plata",
    freq: "FM 96.5",
    url: "https://radios.solumedia.com/6466/stream"
  },
  {
    id: "valleviejo",
    name: "Radio Valle Viejo",
    freq: "FM 105.5",
    url: "https://stm2.livecastradio.com:9379/stream"
  },
  {
    id: "nihuil",
    name: "Radio Nihuil",
    freq: "AM 680",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/NIHUIL_SC"
  },
  {
    id: "lt9",
    name: "LT9",
    freq: "AM 690",
    url: "https://streaming1.locucionar.com/proxy/lt9?mp=/stream"
  },
  {
    id: "mujerfm",
    name: "Mujer FM",
    freq: "FM 95.5",
    url: "https://frontend.radiohdvivo.com/mujerfm/live"
  },
  {
    id: "laestacion",
    name: "La Estación FM",
    freq: "FM 101.3",
    url: "https://01.solumedia.com.ar:8462/stream"
  },
  {
    id: "radioboing",
    name: "Radio Boing",
    freq: "FM 97.3",
    url: "https://streaming.redboing.com/radio/8000/radio.aac"
  },
  {
    id: "belgrano",
    name: "Belgrano Radio",
    freq: "AM 950",
    url: "https://server.laradio.online:15223/live.mp3"
  },
  {
    id: "elobservador",
    name: "El Observador",
    freq: "Online",
    url: "https://unlimited5-us.dps.live/observador/aac/icecast.audio"
  },
  {
    id: "futurock",
    name: "Futuröck",
    freq: "Online",
    url: "https://mdstrm.com/audio/5d9d019112cbbb45d6a50960/icecast.audio"
  },
  {
    id: "la2x4",
    name: "La 2x4",
    freq: "FM 92.7",
    url: "https://media.radios.ar:9270/"
  },
  {
    id: "impacto947",
    name: "Impacto 94.7",
    freq: "FM 94.7",
    url: "https://radiosar.com:8008/stream"
  },
  {
    id: "classique",
    name: "Classique",
    freq: "FM 96.5",
    url: "https://01.solumedia.com.ar:8562/stream"
  },
  {
    id: "fmtrance",
    name: "FM Trance 103.3",
    freq: "FM 103.3",
    url: "https://streaming01.shockmedia.com.ar:10262/stream"
  },
  {
    id: "fisherton",
    name: "Fisherton Classic",
    freq: "Online",
    url: "https://media425.digitar.net:8081/fishertonclassic.mp3"
  },
  {
    id: "lu5",
    name: "LU5",
    freq: "AM 1550",
    url: "https://live.lu5am.com:8443/LU5"
  },
  {
    id: "orfeofm",
    name: "Orfeo FM",
    freq: "FM 90.1",
    url: "https://streaming.gostreaming.com.ar:10970/;"
  },
  {
    id: "moodradio",
    name: "Mood Radio",
    freq: "Online",
    url: "https://radios.solumedia.com:6710/stream"
  },
  {
    id: "estacion1009",
    name: "100.9 Estación del Sol",
    freq: "FM 100.9",
    url: "https://st1-mpanel-icy.masterhost.com.ar:8100/radio.mp3"
  },
  {
    id: "lanacion1049",
    name: "La Nación 104.9",
    freq: "FM 104.9",
    url: "https://stream.radio.co/s2ed3bec0a/listen"
  },
  {
    id: "radioone",
    name: "Radio One 103.7",
    freq: "FM 103.7",
    url: "https://one.stweb.tv/one/live/playlist.m3u8"
  },
  {
    id: "popular",
    name: "Radio Popular",
    freq: "AM 900",
    url: "https://c3ny1.mediainbox.net/popular.mp3"
  }
];


/* ---- Orden de la lista: primero las de Chaco / Machagai, después por categoría ---- */
const TOP_IDS = ["radiotop", "Pobre Johnny", "El mañanero", "FM libertad Machagai",
                 "VIP FM", "Master FM", "Cristalfm", "laradio1047", "facundoquiroga"];
const CAT_ORDER = ["chaco", "religiosas", "noticias", "musica", "folklore", "deportes"];
const CAT_LABEL = {
  chaco: "Chaco y Machagai",
  musica: "Música",
  noticias: "Noticias",
  folklore: "Folklore",
  deportes: "Deportes",
  religiosas: "Religiosas"
};
const CAT_BY_ID = {
  religiosas: ["radiomaria", "radiomaria_apk"],
  noticias: ["nacional", "lra26", "Las Lomitas", "mitre", "lared", "continental", "rivadavia", "cnnradio",
             "Radio 10", "Radio Con Vos", "infobae", "cadena3am", "madre", "eldesta", "lu9", "lu2", "lu19", "lt3",
             "unicordoba", "cooperativa", "zonica", "delpueblo", "genesis", "la990", "delplata", "guemes",
             "delaciudad", "federal", "radiosur", "ecomedios", "ondalatina", "Radio Mocovl AM 800",
             "delsur", "am530", "colonia", "nihuil", "lt9", "belgrano", "elobservador", "lu5", "lanacion1049"],
  folklore:  ["Radio Chamame", "Polca Paraguaya","fmuniversochamame" ,"Ñande Reko Radio", "FOLKLORE RADIO", "doradofm", "nacionalfolklorica"],
  deportes:  ["dsports", "fmlaredonda"],
  musica: ["fmvida", "miafm", "mucha", "laplata965", "valleviejo", "mujerfm", "laestacion", "radioboing",
           "futurock", "la2x4", "impacto947", "classique", "fmtrance", "fisherton", "orfeofm", "moodradio",
           "estacion1009", "radioone", "popular"]
};
(function sortStations() {
  const catOf = {};
  Object.keys(CAT_BY_ID).forEach(cat => CAT_BY_ID[cat].forEach(id => { catOf[id] = cat; }));
  STATIONS.forEach(st => {
    const top = TOP_IDS.indexOf(st.id);
    st.cat = top >= 0 ? "chaco" : (catOf[st.id] || "musica");   // lo que no está en una lista queda en Música
    st._top = top;
  });
  STATIONS.sort((a, b) => {
    if (a.cat !== b.cat) return CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat);
    return a.cat === "chaco" ? a._top - b._top : 0;             // el resto mantiene su orden original
  });
})();


/* ---- Logos de las emisoras ----
   Preferimos logos/*.webp (más livianos). Si no hay, usamos radio_logos/*_list_100.
   La clave es el id de la emisora. Las que no tienen logo muestran iniciales. */
const LOGOS = {
  "mitre": "./logos/mitre.webp",
  "lared": "./logos/lared.webp",
  "la100": "./logos/la100.webp",
  "rivadavia": "./logos/rivadavia.webp",
  "aspen": "./logos/aspen.webp",
  "Radio 10": "./logos/radio10.webp",
  "blue": "./logos/blue.webp",
  "rockpop": "./logos/rockpop.webp",
  "continental": "./logos/continental.webp",
  "facundoquiroga": "./logos/facundoquiroga.webp",
  "delplata": "./logos/delplata.webp",
  "Cadena Heat": "./logos/heat.webp",
  "fmcordoba": "./logos/heat.webp",
  "nacionalfolklorica": "./logos/nacionalfolklorica.webp",
  "nacional": "./logos/nacional.webp",
  "nacionalrock": "./logos/nacional.webp",
  "nacionalclasica": "./logos/nacional.webp",
  "estaciondelsol": "./logos/estaciondelsol.webp",
  "lu19": "./logos/lu19.webp",
  "disney": "./logos/disney.webp",
  "am750": "./logos/am750.webp",
  "Radio Latina 101.1": "./logos/latina.webp",
  "los40": "./logos/los40.webp",
  "mia": "./logos/mia.webp",
  "cadena3am": "./logos/cadena3.webp",
  "cadena3fm": "./logos/cadena3.webp",
  "Vale 97.5": "./logos/vale.webp",
  "La mega": "./logos/mega.webp",
  "urbana": "./logos/urbana.webp",
  "Radio Con Vos": "./logos/convos.webp",
  "la990": "./logos/la990.webp",
  "lt10": "./logos/lt10.webp",
  "eldesta": "./logos/eldesta.webp",
  "delta": "./logos/delta.webp",
  "berlin": "./logos/berlin.webp",
  "suquia": "./logos/suquia.webp",
  // Fallbacks desde radio_logos (mobile pack)
  "guemes": "./radio_logos/radio-guemes_list_100.jpg",
  "radiosur": "./radio_logos/radio-del-sur_list_100.jpg",
  "dsports": "./radio_logos/d-sports-radio_list_100.jpg",
  "fmdelmar": "./radio_logos/radio-del-mar_list_100.jpg",
  "lt3": "./radio_logos/lt3-am680_list_100.jpg",
  "belgrano": "./radio_logos/belgrano-radio_list_100.jpg",
  "metro": "./radio_logos/la-100_list_100.jpg"
};
// Normalización por id en minúsculas / sin espacios
const LOGOS_NORM = {};
Object.keys(LOGOS).forEach((k) => {
  LOGOS_NORM[k] = LOGOS[k];
  LOGOS_NORM[k.toLowerCase().trim()] = LOGOS[k];
  LOGOS_NORM[k.toLowerCase().replace(/\s+/g, "")] = LOGOS[k];
});
STATIONS.forEach((st) => {
  const id = st.id;
  st.logo = LOGOS[id]
    || LOGOS_NORM[id]
    || LOGOS_NORM[String(id).toLowerCase().trim()]
    || LOGOS_NORM[String(id).toLowerCase().replace(/\s+/g, "")]
    || null;
});

/* ============================================================
   Idiomas (botón "Idioma"): español, inglés y portugués
   ============================================================ */
const LANGS = ["es", "en", "pt"];
const LANG_NAME = { es: "Español", en: "English", pt: "Português" };
const I18N = {
  es: {
    search: "Buscar", memories: "Memorias", language: "Idioma", play: "Reproducir", change: "Cambiar",
    update: "Actualizar", config: "Config", volume: "Volumen", prev: "Anterior", next: "Siguiente",
    playing: "Reproduciendo", connecting: "Conectando…", paused: "Pausado", nosignal: "Sin señal",
    buffering: "Cargando…", ready: "Listo",
    pick: "Elegí una emisora", online: "Online",
    searchPh: "Buscar emisora o frecuencia…", count: "{n} de {t}",
    empty: "No hay emisoras con ese nombre. Probá con otra palabra o con la frecuencia, por ejemplo 95.9.",
    emptyMem: "Todavía no guardaste emisoras. Pasá el mouse sobre una y tocá la estrella.",
    emptyBand: "No hay emisoras en esta banda.",
    band: "Banda: {b}", bandAll: "Todas",
    memOn: "Memorias", memOff: "Todas las emisoras", memSaved: "Guardada en Memorias", memRemoved: "Quitada de Memorias",
    starAdd: "Guardar en Memorias", starDel: "Quitar de Memorias",
    langToast: "Idioma: {l}", vol: "Volumen {n}%", muted: "Silenciado",
    updNew: "¡Nueva!", updBusy: "Buscando…", updApply: "Instalando…", updOk: "Al día", updErr: "Sin red",
    updNewMsg: "Hay una actualización nueva", updOkMsg: "Estás al día", updErrMsg: "Sin conexión",
    updApplyMsg: "Instalando la actualización…", updBusyMsg: "Buscando actualización…",
    cfgTitle: "Configuración", cfgNote: "Sin publicidad. Solo buena música.", close: "Cerrar",
    cfgKeys: "Atajos de teclado", kPlay: "Reproducir o pausar", kTune: "Cambiar de emisora", kSearch: "Buscar", kMem: "Guardar en Memorias",
    cfgShortcut: "Acceso directo",
    cfgShortcutText: "Abrí Radio Argentina con un clic, sin buscar la página. Se guarda en Descargas: arrastralo al escritorio.",
    dlFor: "Descargar para {os}", installApp: "Instalar como app, con ícono propio", otherOs: "Otro sistema:",
    cfgPhone: "En el celular", cfgPhoneText: "Abrí esta dirección en el celular y elegí «Instalar app» (Android) o «Agregar a inicio» (iPhone).",
    shortcutDone: "Listo: se descargó «{n}». Arrastralo al escritorio.", shortcutInstalling: "Listo, la app se está instalando.",
    insecure: "Estás abriendo la app desde un archivo local o una dirección sin https. El acceso directo funciona, pero para instalarla tiene que estar publicada en una dirección https."
  },
  en: {
    search: "Search", memories: "Memories", language: "Language", play: "Play", change: "Change",
    update: "Update", config: "Settings", volume: "Volume", prev: "Previous", next: "Next",
    playing: "Playing", connecting: "Connecting…", paused: "Paused", nosignal: "No signal",
    buffering: "Loading…", ready: "Ready",
    pick: "Pick a station", online: "Online",
    searchPh: "Search station or frequency…", count: "{n} of {t}",
    empty: "No stations with that name. Try another word or the frequency, for example 95.9.",
    emptyMem: "You haven't saved any stations yet. Hover over one and tap the star.",
    emptyBand: "No stations on this band.",
    band: "Band: {b}", bandAll: "All",
    memOn: "Memories", memOff: "All stations", memSaved: "Saved to Memories", memRemoved: "Removed from Memories",
    starAdd: "Save to Memories", starDel: "Remove from Memories",
    langToast: "Language: {l}", vol: "Volume {n}%", muted: "Muted",
    updNew: "New!", updBusy: "Checking…", updApply: "Installing…", updOk: "Up to date", updErr: "Offline",
    updNewMsg: "A new update is available", updOkMsg: "You're up to date", updErrMsg: "No connection",
    updApplyMsg: "Installing the update…", updBusyMsg: "Checking for updates…",
    cfgTitle: "Settings", cfgNote: "No ads. Just good music.", close: "Close",
    cfgKeys: "Keyboard shortcuts", kPlay: "Play or pause", kTune: "Change station", kSearch: "Search", kMem: "Save to Memories",
    cfgShortcut: "Shortcut",
    cfgShortcutText: "Open Radio Argentina with one click, no need to look for the page. It is saved in Downloads: drag it to the desktop.",
    dlFor: "Download for {os}", installApp: "Install as an app, with its own icon", otherOs: "Other system:",
    cfgPhone: "On your phone", cfgPhoneText: "Open this address on your phone and choose “Install app” (Android) or “Add to Home Screen” (iPhone).",
    shortcutDone: "Done: “{n}” was downloaded. Drag it to the desktop.", shortcutInstalling: "Done, the app is installing.",
    insecure: "You are opening the app from a local file or an address without https. The shortcut works, but to install it the app has to be published at an https address."
  },
  pt: {
    search: "Buscar", memories: "Memórias", language: "Idioma", play: "Reproduzir", change: "Mudar",
    update: "Atualizar", config: "Config", volume: "Volume", prev: "Anterior", next: "Próxima",
    playing: "Reproduzindo", connecting: "Conectando…", paused: "Pausado", nosignal: "Sem sinal",
    buffering: "Carregando…", ready: "Pronto",
    pick: "Escolha uma rádio", online: "Online",
    searchPh: "Buscar rádio ou frequência…", count: "{n} de {t}",
    empty: "Nenhuma rádio com esse nome. Tente outra palavra ou a frequência, por exemplo 95.9.",
    emptyMem: "Você ainda não salvou rádios. Passe o mouse sobre uma e toque na estrela.",
    emptyBand: "Não há rádios nesta banda.",
    band: "Banda: {b}", bandAll: "Todas",
    memOn: "Memórias", memOff: "Todas as rádios", memSaved: "Salva nas Memórias", memRemoved: "Removida das Memórias",
    starAdd: "Salvar nas Memórias", starDel: "Remover das Memórias",
    langToast: "Idioma: {l}", vol: "Volume {n}%", muted: "Sem som",
    updNew: "Nova!", updBusy: "Buscando…", updApply: "Instalando…", updOk: "Em dia", updErr: "Sem rede",
    updNewMsg: "Há uma atualização nova", updOkMsg: "Você está em dia", updErrMsg: "Sem conexão",
    updApplyMsg: "Instalando a atualização…", updBusyMsg: "Buscando atualização…",
    cfgTitle: "Configurações", cfgNote: "Sem publicidade. Só boa música.", close: "Fechar",
    cfgKeys: "Atalhos do teclado", kPlay: "Reproduzir ou pausar", kTune: "Mudar de rádio", kSearch: "Buscar", kMem: "Salvar nas Memórias",
    cfgShortcut: "Atalho",
    cfgShortcutText: "Abra a Radio Argentina com um clique, sem procurar a página. Fica em Downloads: arraste para a área de trabalho.",
    dlFor: "Baixar para {os}", installApp: "Instalar como app, com ícone próprio", otherOs: "Outro sistema:",
    cfgPhone: "No celular", cfgPhoneText: "Abra este endereço no celular e escolha «Instalar app» (Android) ou «Adicionar à Tela de Início» (iPhone).",
    shortcutDone: "Pronto: «{n}» foi baixado. Arraste para a área de trabalho.", shortcutInstalling: "Pronto, o app está sendo instalado.",
    insecure: "Você está abrindo o app a partir de um arquivo local ou de um endereço sem https. O atalho funciona, mas para instalar o app ele precisa estar publicado em um endereço https."
  }
};

function safeGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (_) { return fallback; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (_) {}
}

let lang = safeGet("radio-lang", "es");
if (!I18N[lang]) lang = "es";

function t(key, vars) {
  let s = (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split("{" + k + "}").join(vars[k]); });
  return s;
}

/* ============================================================
   Elementos
   ============================================================ */
const $ = (id) => document.getElementById(id);
const player = $("player");
const stage = $("stage");
const needle = $("needle");
const lcdName = $("lcdName");
const lcdNameText = $("lcdNameText");
const lcdFreq = $("lcdFreq");
const statusText = $("statusText");
const eqEl = $("eq");
const eqBars = Array.from(eqEl.children);
const btnPlay = $("btnPlay");
const btnPrev = $("btnPrev");
const btnNext = $("btnNext");
const btnSearch = $("btnSearch");
const btnMem = $("btnMem");
const btnLang = $("btnLang");
const btnPlaySel = $("btnPlaySel");
const btnBand = $("btnBand");
const btnConfig = $("btnConfig");
const updateBtn = $("updateBtn");
const knob = $("knob");
const volEl = $("vol");
const vFill = $("vFill");
const vThumb = $("vThumb");
const listEl = $("list");
const rowsEl = $("rows");
const searchBar = $("searchBar");
const stationSearch = $("stationSearch");
const stationCount = $("stationCount");
const searchClose = $("searchClose");
const emptyMsg = $("emptyMsg");
const sbUp = $("sbUp");
const sbDown = $("sbDown");
const sbTrack = $("sbTrack");
const sbThumb = $("sbThumb");
const configDialog = $("configDialog");

/* ============================================================
   Estado
   ============================================================ */
let currentStation = null;
let isPlaying = false;
let playToken = 0;
let statusKey = "ready";
let toastTimer = null;
let eqTimer = null;
let metaPollTimer = null;
let favorites = new Set();
try { favorites = new Set(JSON.parse(safeGet("radio-favs", "[]"))); } catch (_) {}
let memOnly = false;
let bandFilter = "all";           // all | fm | am | online
const BANDS = ["all", "fm", "am", "online"];
let searchOpen = false;
let scale = 1;
let volume = 1;
let muted = false;

/* ============================================================
   Frecuencias y dial
   ============================================================ */
function parseFreq(raw) {
  const s = String(raw || "").trim();
  let m = /^(AM|FM)\s*([\d.]+)/i.exec(s);
  if (m) return { band: m[1].toLowerCase(), value: parseFloat(m[2]) };
  m = /^([\d.]+)$/.exec(s);
  if (m) {
    const v = parseFloat(m[1]);
    if (v >= 87 && v <= 109) return { band: "fm", value: v };
    if (v >= 500 && v <= 1800) return { band: "am", value: v };
  }
  return null;                    // "Online" o sin frecuencia
}
STATIONS.forEach((st) => { st._f = parseFreq(st.freq); st._band = st._f ? st._f.band : "online"; });

function freqRow(st) {
  const f = st._f;
  if (!f) return t("online");
  return f.band === "fm" ? f.value.toFixed(1) + " MHz" : Math.round(f.value) + " AM";
}
function freqLcd(st) {
  const f = st._f;
  if (!f) return t("online");
  return f.band === "fm" ? f.value.toFixed(1) + " MHz" : Math.round(f.value) + " kHz";
}

/* Posición de cada número en la imagen del dial (en píxeles de la imagen).
   La escala de la imagen no es lineal, por eso se interpola entre estas marcas. */
const DIAL_FM = [[88, 329], [90, 369], [92, 406], [94, 441], [96, 476], [98, 514], [100, 555], [102, 597], [104, 639], [106, 683], [108, 729], [110, 772]];
const DIAL_AM = [[530, 329], [700, 419], [900, 514], [1200, 627], [1600, 729], [1800, 780]];
function dialX(band, v) {
  const pts = band === "fm" ? DIAL_FM : DIAL_AM;
  let a = pts[0], b = pts[1];
  if (v >= pts[pts.length - 1][0]) { a = pts[pts.length - 2]; b = pts[pts.length - 1]; }
  else {
    for (let i = 0; i < pts.length - 1; i++) {
      if (v >= pts[i][0] && v <= pts[i + 1][0]) { a = pts[i]; b = pts[i + 1]; break; }
    }
  }
  const x = a[1] + ((v - a[0]) / (b[0] - a[0])) * (b[1] - a[1]);
  return Math.min(775, Math.max(300, x));
}
function updateDial() {
  const f = currentStation && currentStation._f;
  if (!f) { needle.classList.remove("on"); return; }
  needle.style.left = (dialX(f.band, f.value) - 4.5) + "px";
  needle.classList.add("on");
}

/* ============================================================
   Display
   ============================================================ */
const STATUS_CLS = { ready: "ready", playing: "ok", connecting: "wait", paused: "ready", nosignal: "err", buffering: "wait" };

function fitName() {
  const box = lcdName, span = lcdNameText;
  box.classList.remove("marquee");
  span.style.fontSize = "";
  let size = 51;
  span.style.fontSize = size + "px";
  const max = box.clientWidth;
  while (span.offsetWidth > max && size > 27) { size -= 1; span.style.fontSize = size + "px"; }
  if (span.offsetWidth > max) {
    span.style.setProperty("--shift", (max - span.offsetWidth - 4) + "px");
    box.classList.add("marquee");
  }
}

/* El texto del display se achica si es más largo que el espacio disponible */
function fitStatus() {
  statusText.style.fontSize = "";
  let size = 27.4;
  while (statusText.offsetWidth > 246 && size > 16) { size -= 0.8; statusText.style.fontSize = size + "px"; }
}
function renderStatus() {
  if (toastTimer) return;
  statusText.textContent = t(statusKey);
  statusText.className = STATUS_CLS[statusKey] || "";
  fitStatus();
}
function setStatus(key) {
  statusKey = key;
  renderStatus();
  setEq(key === "playing" ? "live" : key === "connecting" || key === "buffering" ? "wait" : "idle");
}
function toast(msg, ms = 1800) {
  statusText.textContent = msg;
  statusText.className = "toast";
  fitStatus();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastTimer = null; renderStatus(); }, ms);
}

/* Barras verdes del display */
const EQ_IDLE = [5, 5, 5, 5, 5];
const EQ_WAIT = [8, 12, 8, 12, 8];
function setEq(mode) {
  clearInterval(eqTimer); eqTimer = null;
  eqEl.classList.toggle("live", mode === "live");
  const paint = (hs) => eqBars.forEach((b, i) => { b.style.height = hs[i] + "px"; });
  if (mode === "live") {
    const tick = () => paint(eqBars.map((_, i) => (i === 2 ? 18 : 8) + Math.random() * (i === 2 ? 15 : 22)));
    tick(); eqTimer = setInterval(tick, 150);
  } else paint(mode === "wait" ? EQ_WAIT : EQ_IDLE);
}

function updateDisplay() {
  const st = currentStation;
  lcdNameText.textContent = st ? st.name.trim() : "Radio Argentina";
  lcdFreq.textContent = st ? freqLcd(st) : t("pick");
  fitName();
  updateDial();
  document.title = st && isPlaying ? st.name.trim() + " · Radio Argentina" : "Radio Argentina";
}

/* ============================================================
   Lista de emisoras
   ============================================================ */
function initials(name) {
  return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 3);
}
function logoHtml(st) {
  const ini = initials(st.name);
  if (st.logo) {
    // src con ./ para que funcione aunque la página esté en subcarpeta o con hash
    const src = st.logo.startsWith("./") || st.logo.startsWith("/") || st.logo.startsWith("http")
      ? st.logo
      : "./" + st.logo;
    return `<span class="r-logo"><img src="${src}" alt="" width="44" height="44" loading="lazy" decoding="async" data-fallback="1"></span>`;
  }
  return `<span class="r-logo ph" aria-hidden="true">${ini}</span>`;
}
const STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.9-4.7 4.5 1.2 6.4L12 17.4l-5.7 3.1 1.2-6.4-4.7-4.5 6.4-.9z"/></svg>';

function buildRows() {
  const frag = document.createDocumentFragment();
  STATIONS.forEach((st) => {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.id = st.id;
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", "false");
    row.innerHTML = logoHtml(st) + '<span class="r-name"></span><span class="r-freq"></span><button class="r-star" type="button" tabindex="-1">' + STAR_SVG + "</button>";
    row.querySelector(".r-name").textContent = st.name.trim();
    row.querySelector(".r-freq").textContent = freqRow(st);
    const img = row.querySelector("img");
    if (img) {
      img.addEventListener("error", function onLogoErr() {
        // Si falla el webp, intentar una sola vez con radio_logos si existiera mapeo alternativo
        if (img.dataset.fallback === "1" && st.logo && st.logo.indexOf("logos/") !== -1) {
          img.dataset.fallback = "0";
          const base = st.id.toLowerCase().replace(/\s+/g, "-");
          // no inventamos archivos; pasamos a iniciales
        }
        // Reemplazar por iniciales (evita ícono roto)
        const wrap = img.parentNode;
        if (wrap) wrap.outerHTML = `<span class="r-logo ph" aria-hidden="true">${initials(st.name)}</span>`;
      });
    }
    row.addEventListener("click", (e) => {
      if (e.target.closest(".r-star")) { e.stopPropagation(); toggleFavorite(st); return; }
      selectStation(st);
    });
    st._el = row;
    frag.appendChild(row);
  });
  rowsEl.appendChild(frag);
  refreshStars();
}
function refreshStars() {
  STATIONS.forEach((st) => {
    const on = favorites.has(st.id);
    st._el.classList.toggle("fav", on);
    st._el.querySelector(".r-star").setAttribute("aria-label", t(on ? "starDel" : "starAdd"));
    st._el.querySelector(".r-star").title = t(on ? "starDel" : "starAdd");
  });
}
function refreshRowFreqs() {
  STATIONS.forEach((st) => { st._el.querySelector(".r-freq").textContent = freqRow(st); });
}
function highlightRow() {
  STATIONS.forEach((st) => {
    const on = !!currentStation && st.id === currentStation.id;
    st._el.classList.toggle("sel", on);
    st._el.setAttribute("aria-selected", on ? "true" : "false");
  });
}
function visibleStations() { return STATIONS.filter((st) => !st._el.hidden); }

function applyFilter() {
  const q = stationSearch.value.trim().toLowerCase();
  let shown = 0;
  STATIONS.forEach((st) => {
    const match =
      (!q || st.name.toLowerCase().includes(q) || String(st.freq || "").toLowerCase().includes(q) || freqRow(st).toLowerCase().includes(q)) &&
      (bandFilter === "all" || st._band === bandFilter) &&
      (!memOnly || favorites.has(st.id));
    st._el.hidden = !match;
    if (match) shown += 1;
  });
  stationCount.textContent = shown === STATIONS.length ? "" : t("count", { n: shown, t: STATIONS.length });
  emptyMsg.hidden = shown !== 0;
  if (shown === 0) emptyMsg.textContent = memOnly && !favorites.size ? t("emptyMem") : q ? t("empty") : t("emptyBand");
  btnMem.classList.toggle("on", memOnly);
  btnBand.classList.toggle("on", bandFilter !== "all");
  btnSearch.classList.toggle("on", searchOpen);
  updateScrollbar();
}

function scrollToStation(st, instant) {
  const el = st && st._el;
  if (!el || el.hidden) return;
  const top = el.offsetTop, bottom = top + el.offsetHeight;
  const vt = rowsEl.scrollTop, vb = vt + rowsEl.clientHeight;
  if (top < vt || bottom > vb) rowsEl.scrollTo({ top: Math.max(0, top - 1), behavior: instant ? "auto" : "smooth" });
}

/* ---- Barra de desplazamiento ---- */
function updateScrollbar() {
  const ch = rowsEl.clientHeight, sh = rowsEl.scrollHeight;
  const trackH = sbTrack.clientHeight;
  if (sh <= ch + 1) { sbTrack.classList.add("hidden"); return; }
  sbTrack.classList.remove("hidden");
  const thumbH = Math.max(38, Math.min(trackH, trackH * ch / sh));
  const maxScroll = sh - ch;
  const top = (rowsEl.scrollTop / maxScroll) * (trackH - thumbH);
  sbThumb.style.height = thumbH + "px";
  sbThumb.style.transform = "translateY(" + top + "px)";
}
rowsEl.addEventListener("scroll", updateScrollbar, { passive: true });
sbUp.addEventListener("click", () => rowsEl.scrollBy({ top: -108, behavior: "smooth" }));
sbDown.addEventListener("click", () => rowsEl.scrollBy({ top: 108, behavior: "smooth" }));

(function dragScrollThumb() {
  let startY = 0, startScroll = 0, dragging = false;
  sbThumb.addEventListener("pointerdown", (e) => {
    dragging = true; startY = e.clientY; startScroll = rowsEl.scrollTop;
    sbThumb.setPointerCapture(e.pointerId); e.preventDefault();
  });
  sbThumb.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const trackH = sbTrack.clientHeight;
    const thumbH = sbThumb.offsetHeight;
    const maxScroll = rowsEl.scrollHeight - rowsEl.clientHeight;
    const dy = (e.clientY - startY) / scale;
    rowsEl.scrollTop = startScroll + dy * (maxScroll / Math.max(1, trackH - thumbH));
  });
  const end = () => { dragging = false; };
  sbThumb.addEventListener("pointerup", end);
  sbThumb.addEventListener("pointercancel", end);
  // clic en la ranura: salta una página
  sbTrack.addEventListener("pointerdown", (e) => {
    if (e.target === sbThumb) return;
    const r = sbThumb.getBoundingClientRect();
    rowsEl.scrollBy({ top: (e.clientY < r.top ? -1 : 1) * rowsEl.clientHeight, behavior: "smooth" });
  });
})();

/* ============================================================
   Reproductor
   ============================================================ */
function setPlayIcon(playing) {
  btnPlay.classList.toggle("is-playing", playing);
  btnPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
}

function mediaArtwork() {
  if (currentStation && currentStation.logo) {
    return [{ src: new URL(currentStation.logo, location.href).href, sizes: "128x128", type: "image/webp" }];
  }
  return [
    { src: "icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png" }
  ];
}
function updateMediaSession() {
  if (!("mediaSession" in navigator) || !currentStation) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentStation.name.trim(), artist: "Radio Argentina", album: currentStation.freq, artwork: mediaArtwork()
    });
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  } catch (_) {}
}

function startMetaPoll() {
  stopMetaPoll();
  metaPollTimer = setInterval(() => {
    // Algunos navegadores exponen el título del tema; en la mayoría llega bloqueado por CORS.
    if (!isPlaying || !currentStation || !player.mozGetMetadata) return;
    try {
      const meta = player.mozGetMetadata();
      if (meta && (meta.title || meta.artist) && "mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: meta.title || currentStation.name.trim(), artist: meta.artist || "Radio Argentina",
          album: currentStation.freq, artwork: mediaArtwork()
        });
      }
    } catch (_) {}
  }, 8000);
}
function stopMetaPoll() { clearInterval(metaPollTimer); metaPollTimer = null; }

function rememberStation() { if (currentStation) safeSet("radio-last", currentStation.id); }

function setCurrent(st) {
  currentStation = st;
  highlightRow();
  updateDisplay();
  scrollToStation(st);
  rememberStation();
}

function play() {
  if (!currentStation) return;
  const token = ++playToken;
  setStatus("connecting");
  player.src = currentStation.url;
  player.load();
  const p = player.play();
  if (p && p.then) {
    p.then(() => {
      if (token !== playToken) return;
      isPlaying = true;
      setPlayIcon(true);
      setStatus("playing");
      updateDisplay();
      updateMediaSession();
      startMetaPoll();
    }).catch((err) => {
      if (token !== playToken) return;                 // se cambió de emisora mientras conectaba
      console.warn("Play error:", err);
      isPlaying = false;
      setPlayIcon(false);
      setStatus("nosignal");
      updateDisplay();
      stopMetaPoll();
    });
  }
}

function pause() {
  playToken++;
  player.pause();
  isPlaying = false;
  setPlayIcon(false);
  setStatus("paused");
  updateDisplay();
  stopMetaPoll();
  updateMediaSession();
}

function selectStation(st) {
  if (currentStation && currentStation.id === st.id && isPlaying) { pause(); return; }
  setCurrent(st);
  play();
}

/* Pasar a la emisora anterior o siguiente (entre las que se ven en la lista) */
function stepStation(dir) {
  const list = visibleStations();
  if (!list.length) return;
  let i = currentStation ? list.findIndex((s) => s.id === currentStation.id) : -1;
  i = i === -1 ? (dir > 0 ? 0 : list.length - 1) : (i + dir + list.length) % list.length;
  setCurrent(list[i]);
  play();
}

function togglePlay() {
  if (!currentStation) {
    const first = visibleStations()[0];
    if (first) selectStation(first);
    return;
  }
  if (isPlaying) pause(); else play();
}

/* "Reproducir": toca la emisora elegida; si ya suena, vuelve a conectarla (sirve cuando se corta) */
function playSelected() {
  if (!currentStation) { togglePlay(); return; }
  play();
}

player.addEventListener("error", () => {
  if (!player.getAttribute("src")) return;
  isPlaying = false;
  setPlayIcon(false);
  setStatus("nosignal");
  stopMetaPoll();
  updateDisplay();
});
player.addEventListener("waiting", () => { if (isPlaying) setStatus("buffering"); });
player.addEventListener("playing", () => {
  if (!currentStation) return;
  isPlaying = true;
  setPlayIcon(true);
  setStatus("playing");
  updateMediaSession();
});
player.addEventListener("ended", () => {
  isPlaying = false; setPlayIcon(false); setStatus("paused"); stopMetaPoll(); updateDisplay();
});

if ("mediaSession" in navigator) {
  try {
    navigator.mediaSession.setActionHandler("play", () => { if (currentStation) play(); });
    navigator.mediaSession.setActionHandler("pause", () => pause());
    navigator.mediaSession.setActionHandler("stop", () => pause());
    navigator.mediaSession.setActionHandler("previoustrack", () => stepStation(-1));
    navigator.mediaSession.setActionHandler("nexttrack", () => stepStation(1));
  } catch (_) {}
}

/* ============================================================
   Volumen: perilla y slider
   ============================================================ */
const VOL_X0 = 814, VOL_RANGE = 140;           // centro de la perilla del slider: 814 (0%) → 954 (100%)
function paintVolume() {
  const cx = VOL_X0 + volume * VOL_RANGE;                      // en coordenadas de la imagen
  vThumb.style.left = (cx - 22 - 786) + "px";
  vFill.style.width = (cx - 794) + "px";
  const pct = Math.round(volume * 100);
  volEl.setAttribute("aria-valuenow", pct);
  knob.setAttribute("aria-valuenow", pct);
}
function setVolume(v, announce) {
  volume = Math.min(1, Math.max(0, v));
  if (muted && volume > 0) muted = false;
  player.muted = muted;
  player.volume = volume;
  paintVolume();
  safeSet("radio-vol", String(volume));
  if (announce) toast(t("vol", { n: Math.round(volume * 100) }), 1100);
}
function toggleMute() {
  muted = !muted;
  player.muted = muted;
  toast(muted ? t("muted") : t("vol", { n: Math.round(volume * 100) }), 1100);
}

(function sliderControls() {
  let dragging = false;
  const fromPointer = (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / scale;
    setVolume((x - VOL_X0) / VOL_RANGE, true);
  };
  volEl.addEventListener("pointerdown", (e) => { dragging = true; volEl.setPointerCapture(e.pointerId); fromPointer(e); e.preventDefault(); });
  volEl.addEventListener("pointermove", (e) => { if (dragging) fromPointer(e); });
  const end = () => { dragging = false; };
  volEl.addEventListener("pointerup", end);
  volEl.addEventListener("pointercancel", end);
})();

(function knobControls() {
  let startY = 0, startV = 0, moved = false, down = false;
  knob.addEventListener("pointerdown", (e) => {
    down = true; moved = false; startY = e.clientY; startV = volume;
    knob.setPointerCapture(e.pointerId); e.preventDefault();
  });
  knob.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dy = (startY - e.clientY) / scale;
    if (Math.abs(dy) > 3) moved = true;
    if (moved) setVolume(startV + dy / 170, true);
  });
  const end = () => { if (down && !moved) toggleMute(); down = false; };
  knob.addEventListener("pointerup", end);
  knob.addEventListener("pointercancel", () => { down = false; });
})();

function wheelVolume(e) {
  e.preventDefault();
  setVolume(volume + (e.deltaY < 0 ? 0.05 : -0.05), true);
}
knob.addEventListener("wheel", wheelVolume, { passive: false });
volEl.addEventListener("wheel", wheelVolume, { passive: false });
function keyVolume(e) {
  const step = e.key === "ArrowUp" || e.key === "ArrowRight" ? 0.05 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -0.05 : 0;
  if (!step) return;
  e.preventDefault(); e.stopPropagation();
  setVolume(volume + step, true);
}
knob.addEventListener("keydown", keyVolume);
volEl.addEventListener("keydown", keyVolume);

/* ============================================================
   Botonera
   ============================================================ */
function openSearch() {
  searchOpen = true;
  listEl.classList.add("searching");
  btnSearch.classList.add("on");
  stationSearch.focus();
  stationSearch.select();
  updateScrollbar();
}
function closeSearch() {
  searchOpen = false;
  listEl.classList.remove("searching");
  stationSearch.value = "";
  stationSearch.blur();
  applyFilter();
  if (currentStation) scrollToStation(currentStation, true);
}
btnSearch.addEventListener("click", () => { if (searchOpen) closeSearch(); else openSearch(); });
searchClose.addEventListener("click", closeSearch);
stationSearch.addEventListener("input", () => { applyFilter(); rowsEl.scrollTop = 0; });
stationSearch.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { e.preventDefault(); closeSearch(); }
  else if (e.key === "Enter") {
    e.preventDefault();
    const first = visibleStations()[0];
    if (first) selectStation(first);
  }
});

btnMem.addEventListener("click", () => {
  memOnly = !memOnly;
  applyFilter();
  rowsEl.scrollTop = 0;
  toast(memOnly ? t("memOn") : t("memOff"));
});

function toggleFavorite(st) {
  st = st || currentStation;
  if (!st) return;
  const on = favorites.has(st.id);
  if (on) favorites.delete(st.id); else favorites.add(st.id);
  safeSet("radio-favs", JSON.stringify([...favorites]));
  refreshStars();
  if (memOnly) applyFilter();
  toast(on ? t("memRemoved") : t("memSaved"));
}

btnBand.addEventListener("click", () => {
  bandFilter = BANDS[(BANDS.indexOf(bandFilter) + 1) % BANDS.length];
  applyFilter();
  rowsEl.scrollTop = 0;
  const label = bandFilter === "all" ? t("bandAll") : bandFilter === "online" ? t("online") : bandFilter.toUpperCase();
  toast(t("band", { b: label }));
});

btnLang.addEventListener("click", () => {
  lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
  safeSet("radio-lang", lang);
  applyLang();
  toast(t("langToast", { l: LANG_NAME[lang] }));
});

btnPlay.addEventListener("click", togglePlay);
btnPlaySel.addEventListener("click", playSelected);
btnPrev.addEventListener("click", () => stepStation(-1));
btnNext.addEventListener("click", () => stepStation(1));

/* ---- Textos según el idioma ---- */
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (el.hasAttribute("data-update-text")) return;      // el texto de Actualizar lo maneja renderUpdate()
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const s = t(el.getAttribute("data-i18n-title")); el.title = s; el.setAttribute("aria-label", s);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
  btnPlay.title = btnPlaySel.title = "";
  btnConfig.title = t("config");
  btnLang.title = LANG_NAME[lang];
  searchClose.setAttribute("aria-label", t("close"));
  $("configClose").setAttribute("aria-label", t("close"));
  refreshRowFreqs();
  refreshStars();
  applyFilter();
  renderStatus();
  updateDisplay();
  renderUpdate();
  refreshShortcutUi();
}

/* ============================================================
   Botón Actualizar (lo mueve update.js)
   ============================================================ */
let updState = "idle";
function renderUpdate() {
  const label = $("updateBtn").querySelector("[data-update-text]");
  const map = { idle: "update", busy: "updBusy", applying: "updApply", pending: "updNew", uptodate: "updOk", error: "updErr" };
  label.textContent = t(map[updState] || "update");
  updateBtn.classList.toggle("has-update", updState === "pending");
  updateBtn.classList.toggle("is-busy", updState === "busy" || updState === "applying");
  const msg = { pending: "updNewMsg", busy: "updBusyMsg", applying: "updApplyMsg", uptodate: "updOkMsg", error: "updErrMsg" }[updState];
  updateBtn.title = msg ? t(msg) : t("update");
}
window.addEventListener("radio-update", (e) => {
  const prev = updState;
  updState = (e.detail && e.detail.state) || "idle";
  renderUpdate();
  if (updState === prev) return;
  const msg = { pending: "updNewMsg", busy: "updBusyMsg", applying: "updApplyMsg", uptodate: "updOkMsg", error: "updErrMsg" }[updState];
  if (msg) toast(t(msg), updState === "pending" ? 4500 : 2200);
});

/* ============================================================
   Config + acceso directo
   ============================================================ */
const shortcutNote = $("shortcutNote");
const shortcutMsg = $("shortcutMsg");
const dlShortcut = $("dlShortcut");
const installPc = $("installPc");
let deferredPrompt = null;

const ua = navigator.userAgent || "";
const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /android/i.test(ua);
const isMobile = isIOS || isAndroid;
const isMac = !isIOS && /mac/i.test(navigator.platform || "");
const isLinux = !isMobile && /linux|x11/i.test(ua);
const pcOS = isMac ? "mac" : isLinux ? "linux" : "windows";
const OS_LABEL = { windows: "Windows", mac: "Mac", linux: "Linux" };
const isStandalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;

const SHORTCUTS = {
  windows: { ext: "url", mime: "application/internet-shortcut", build: (u) => "[InternetShortcut]\r\nURL=" + u + "\r\nIconIndex=0\r\n" },
  mac: {
    ext: "webloc", mime: "application/xml",
    build: (u) => '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
      '<plist version="1.0"><dict><key>URL</key><string>' + u.replace(/&/g, "&amp;") + "</string></dict></plist>\n"
  },
  linux: {
    ext: "desktop", mime: "application/x-desktop",
    build: (u) => "[Desktop Entry]\nVersion=1.0\nType=Link\nName=Radio Argentina\nComment=Radios de Argentina en vivo\nURL=" + u + "\n"
  }
};

function appUrl() {
  const u = new URL("./", location.href);
  u.hash = ""; u.search = "";
  return u.href;
}
function showMsg(text) { shortcutMsg.textContent = text || ""; }

function downloadShortcut(os) {
  const def = SHORTCUTS[os];
  const name = "Radio Argentina." + def.ext;
  const blob = new Blob([def.build(appUrl())], { type: def.mime + ";charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  showMsg(t("shortcutDone", { n: name }));
}

function refreshShortcutUi() {
  // Mostrar siempre el botón de instalar si el navegador puede; se habilita cuando llega beforeinstallprompt
  const canPrompt = !!deferredPrompt;
  installPc.hidden = false;
  installPc.disabled = !canPrompt;
  installPc.style.opacity = canPrompt ? "1" : "0.55";
  installPc.title = canPrompt ? "" : (location.protocol === "file:" || !window.isSecureContext
    ? "Para instalar como app hace falta publicar la radio en una dirección https"
    : "El navegador aún no ofreció la instalación (probá recargar o usar Chrome/Edge)");
  dlShortcut.textContent = t("dlFor", { os: OS_LABEL[pcOS] });
  dlShortcut.dataset.os = pcOS;
  configDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => { b.hidden = b.dataset.os === pcOS; });
  const insecure = location.protocol === "file:" || !window.isSecureContext;
  shortcutNote.hidden = !insecure;
  shortcutNote.textContent = insecure ? t("insecure") : "";
  $("wayShortcut").hidden = isStandalone;
}

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  showMsg(outcome === "accepted" ? t("shortcutInstalling") : "");
  refreshShortcutUi();
}

function openConfig() {
  showMsg("");
  refreshShortcutUi();
  if (configDialog.showModal) configDialog.showModal(); else configDialog.setAttribute("open", "");
}
function closeConfig() {
  if (configDialog.close) configDialog.close(); else configDialog.removeAttribute("open");
}
btnConfig.addEventListener("click", openConfig);
$("configClose").addEventListener("click", closeConfig);
configDialog.addEventListener("click", (e) => { if (e.target === configDialog) closeConfig(); });
dlShortcut.addEventListener("click", () => downloadShortcut(dlShortcut.dataset.os || pcOS));
configDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => b.addEventListener("click", () => downloadShortcut(b.dataset.os)));
installPc.addEventListener("click", installApp);
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  refreshShortcutUi();
  // Primera vez que el navegador ofrece instalar: avisar al usuario
  if (!safeGet("radio-saw-install", "")) {
    safeSet("radio-saw-install", "1");
    setTimeout(() => toast(t("installApp") + " → Config", 4500), 1200);
  }
});
window.addEventListener("appinstalled", () => { deferredPrompt = null; refreshShortcutUi(); });

/* ============================================================
   Teclado
   ============================================================ */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (document.querySelector("dialog[open]")) return;
  const tag = e.target && e.target.tagName;
  const typing = tag === "INPUT" || tag === "TEXTAREA";
  if (typing) return;
  const onBody = e.target === document.body;
  const key = e.key;

  if (key === "/") { e.preventDefault(); openSearch(); }
  else if (key === "m" || key === "M") { if (onBody) toggleFavorite(); }
  else if (e.code === "Space" && onBody) { e.preventDefault(); togglePlay(); }
  else if ((key === "ArrowRight" || key === "ArrowDown") && onBody) { e.preventDefault(); stepStation(1); }
  else if ((key === "ArrowLeft" || key === "ArrowUp") && onBody) { e.preventDefault(); stepStation(-1); }
  else if (key === "Escape" && searchOpen) closeSearch();
});

/* Los botones tocados con el mouse sueltan el foco, así Espacio sigue siendo play/pausa */
stage.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b && e.detail > 0) b.blur();
});

/* ============================================================
   Escala: el escenario de 1536 × 1024 se ajusta a la ventana
   ============================================================ */
function fit() {
  const vw = window.innerWidth, vh = window.innerHeight;
  scale = Math.min(vw / 1536, vh / 1024);
  const x = (vw - 1536 * scale) / 2, y = (vh - 1024 * scale) / 2;
  stage.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")";
}
window.addEventListener("resize", fit);

/* ============================================================
   Inicio
   ============================================================ */
buildRows();
(function restoreVolume() {
  const v = parseFloat(safeGet("radio-vol", "1"));
  volume = isNaN(v) ? 1 : Math.min(1, Math.max(0, v));
  player.volume = volume;
  paintVolume();
})();
(function restoreStation() {
  const last = safeGet("radio-last", "");
  currentStation = STATIONS.find((s) => s.id === last) || STATIONS[0] || null;
  highlightRow();
})();
fit();
applyLang();
setStatus("ready");
setPlayIcon(false);
stage.classList.add("ready");
if (currentStation) scrollToStation(currentStation, true);
updateScrollbar();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => { fitName(); updateScrollbar(); });
}

// Primera visita: avisar dónde está el acceso directo (solo una vez)
(function firstVisitTip() {
  if (isStandalone) return;
  if (safeGet("radio-first-pc", "")) return;
  safeSet("radio-first-pc", "1");
  setTimeout(() => {
    toast("Acceso directo → botón Config", 5000);
  }, 1800);
})();
