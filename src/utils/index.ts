export const nameCheck = (value:string)=>{
    const formatted = value.toLowerCase().split(' ').map((word)=> word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
    
    return formatted  
  }

  const avatarUrls = [
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016476/Avatars/01_uu16m8.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016476/Avatars/02_tgxj2x.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016476/Avatars/03_ms3naj.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/04_wjhhvo.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/05_eitz4j.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/06_lfeooz.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/07_h4m6r9.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/08_mcarcb.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/09_vtzccg.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/10_f29rqu.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/11_xxb3ti.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/12_bxqn4j.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/13_dfkv0w.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/14_t80n1c.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016475/Avatars/15_a60egg.png',
    'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688016476/Avatars/16_szovkr.png',
  ];
  
 export  const randomAvatar = (): string => {
    const randomIndex = Math.floor(Math.random() * avatarUrls.length);
    return avatarUrls[randomIndex];
  };