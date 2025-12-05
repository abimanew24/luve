// --- 1. SETUP AWAL (SCROLL & ANIMASI) ---
if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);
window.onload = function() { window.scrollTo(0, 0); }
AOS.init({ duration: 1000, once: false });

// --- 2. VARIABEL ELEMENT ---
const intro = document.getElementById('intro');
const music = document.getElementById('bg-music');
const videoModal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('myVideo'); // Ambil elemen <video>
const photoStoryModal = document.getElementById('photo-story-modal');
const storyImgPlaceholder = document.getElementById('story-img-placeholder');
const storyDescPlaceholder = document.getElementById('story-desc-placeholder');

// --- 3. LOGIKA PASSWORD ---
function checkPassword() {
    var input = document.getElementById('pass-input').value;
    // Password: buneoo sayang luvee
    if(input.toLowerCase() === "buneoo sayang luvee") {
        document.getElementById('password-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('password-screen').style.display = 'none';
            // Munculkan Halaman Surat
            document.getElementById('letter-screen').style.display = 'flex';
        }, 800);
    } else {
        alert("Password salah sayang :p");
    }
}

// --- 4. LOGIKA SURAT & NAVIGASI ---
function closeLetter() {
    // Hilangkan Surat
    document.getElementById('letter-screen').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('letter-screen').style.display = 'none';
        
        // MUNCULKAN MAIN CONTENT
        const mainContent = document.getElementById('main-content');
        mainContent.style.display = 'block';
        
        // Refresh Animasi AOS
        AOS.refresh();
        
        // Nyalakan Musik (lagu-romantis.mp3)
        // Pastikan file 'lagu-romantis.mp3' ada di folder yang sama
        music.play().catch(e => console.log("Audio perlu interaksi user"));
        
    }, 1000);
}

function startGallery() {
    intro.style.transform = 'translateY(-100%)';
}

// --- 5. LOGIKA VIDEO PLAYER (LOCAL FILE) ---
function playVideo() {
    videoModal.style.display = 'flex';
    
    // Play Video Lokal (source: video/your-video.mp4)
    videoPlayer.play(); 
    
    // Matikan Musik Background biar ga tabrakan
    music.pause(); 
}

function closeVideo() {
    videoModal.style.display = 'none';
    
    // Pause & Reset Video
    videoPlayer.pause();
    videoPlayer.currentTime = 0; 
    
    // Nyalakan Musik Background lagi
    music.play(); 
}

// --- 6. DATABASE CERITA (30 FOTO) ---
const photoCaptions = {
    'foto1.jpg': 'awalnya malu banget ajak kamu foto, tapi aku kan keren yah, dengan gagah berani aku bilang foto yuuu, ehh bidadarinya mauu.',
    'foto2.jpg': 'foto gini tu lucu banget, dan first time aku ajak kamu mlipir di pinggir jalan ehe.',
    'foto3.jpg': 'kedinginan di jalan mampir kedai buat nunggu kabut memeluk kita.',
    'foto4.jpg': 'perpusda pertama yang mengajarkan aku khususnya, bahwa buku saja bisa ngga dibaca kalau dekat kamuuu.',
    'foto5.jpg': 'pulang dari bedakah dengan dinginnya kabut eh langsung jajan ess ekeke, ini klo ada mama pasti dibilang ess terosss.',
    'foto6.jpg': 'ini menjer, dimana kita memanjakan mata dengan memandang hamparan air yang membendung rindu tak usai, intinya sayang takut naik kapal wkwkw.',
    'foto7.jpg': 'mengira dan menerka masa depan di atas khayangan, menemani lembutnya sinar mentari dan udara sejuk yang ikut merayakan kita.',
    'foto8.jpg': 'yeayyy pletukkk, next ke sini lagi yahhh cayanggg, mau bbq-an kann ayow ayowww.',
    'foto9.jpg': 'gatau pokoknya ini cantikkk kebangetennn eheee lopp.',
    'foto10.jpg': 'ini di panama, kok ga keliatan panamanya? yahh dimanapun berada klo sama luve mah alam pun baper liatnyaaa.',
    'foto11.jpg': 'ini aku berterimakasih sama tonooooo wkwkwkwwkwkwk.',
    'foto12.jpg': 'idung pedang sok-sokan di gede gedein wkwkwk, btw upil mau upil?.',
    'foto13.jpg': 'cembeyut ajaa masi cyutttttt.',
    'foto14.jpg': 'idi idiiiiii awww lucunaaaaaaa cewe ciapaciiii.',
    'foto15.jpg': 'ala alaaa kemayuneee ini mah lagi salting bcs liat kegantengan sang author(abimanyu) wkwkw.',
    'foto16.jpg': 'ini mam geprek bu mar, katanya ngidam bangett, okeh sayang apa sih yang engga buat dede.',
    'foto17.jpg': 'abi sama umi lagi beli nasi goreng ya anak-anak, sebentar lagi pulang, kalian jangan nakall.',
    'foto18.jpg': 'mie ayam rempah, oh yaa kasian yah sebelah ngga ada yang beli hiksss, ayoo beliii.',
    'foto19.jpg': 'nah kalau yang ini mah saung bu mansur, tau ga luvv kamu disini cantiknya kebangeten asliii, kalau di sastrain mah, bak paku yang tunduk dengan palu namun ia semakin menyatu dengan kayu.',
    'foto20.jpg': 'look at our eyes, bendul bendul bangun bobo langsung mam buburr om aan wkwkw, btw gas lagii ayuk.',
    'foto21.jpg': 'ini jujur style paling aku sukaaa bcs sayang sukakkkkkkk dannn sayanggg juga ihh masyaallah meleleh akhi wahai ukhti.',
    'foto22.jpg': 'spidy spidyyy, ga nyangka bakal couple wkwkw, sampe sekarang klo aku cuci ati atiiii banget bahkan gamau aku laundryyy huhuu, timaaciii luvvvvv.',
    'foto23.jpg': 'ini part di omelin gegara ngga ikut ngaji masuk ke masjid huhu, tapii sukaaaaa, perhatian banget sih ning ehe.',
    'foto24.jpg': 'jujur yaaa sayang, ihhh kamu maaaa bikin aku was-was bangettt jealous bangettt huhu, tapi dibalik itu semua tau kannnn aku sayang banget sama kamuu luvv, btw narinya bagus bangett ehhh, lincah banget asli dah, curiga biru bakal selincah kamu deh.',
    'foto25.jpg': 'wakil dan ketua panitia, terimakasiii KSR untuk segala riweh mumetnya, but gapapa aku dapet nihh my bubub yang selalu jadi support akuuuuu.',
    'foto26.jpg': 'luvee look bunga di belakang aja malu lihat kamu lhooooo, one day kita punya taman bunga yang banyak yah sayanggg.',
    'foto27.jpg': 'tuhhh sayang maaa canciii bangett, gimana aku ga was-was aghhh, lope uuu.',
    'foto28.jpg': 'hayoloooo cupang pertamaa, oza hidup lagiii, ini kalau sayang jago ngerawat aku tambahin deeee seriusssssss.',
    'foto29.jpg': 'mam nasgor di dgazz, yah banyak nyamuk tapi banyak cerita, ihh kodokkk jahat bett asli dah huhu, untung aku cowo kamuuu mweheh, lopuuuu.',
    'foto30.jpg': 'dannn yang ini...... paling aku sukaa, sayang dengan teduh binar matanya menyiratkan keindahan ciptaan sang maha pengasih, bagai rembulan yang selalu menyinari bumi dengan heningnya malam, disitulah aku selalu melihat binar matamu lail.....',
};

// --- 7. EVENT LISTENER FOTO ---
document.querySelectorAll('.clickable-photo').forEach(item => {
    item.addEventListener('click', function() {
        const imgElement = this.querySelector('img');
        const imgSrc = imgElement.getAttribute('src');
        const filename = imgSrc.split('/').pop();
        
        const caption = photoCaptions[filename] || "Kenangan indah yang tak terlupakan, tersimpan rapi di sini.";
        
        storyImgPlaceholder.src = imgSrc;
        storyDescPlaceholder.innerText = caption;
        photoStoryModal.style.display = 'flex';
    });
});

function closePhotoStory(event) {
    if (event.target === photoStoryModal) {
        photoStoryModal.style.display = 'none';
    }
}

function forceClosePhotoStory() {
    photoStoryModal.style.display = 'none';
}