const sendJwtToClient=(user,res)=>{
    //generate jwt
    const token=user.generateJwtFromUser();
    const {JWT_COOKIE,NODE_ENV}=process.env;
    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+parseInt(JWT_COOKIE)*1000*60),
        secure:NODE_ENV==="developments"?false:true
    }).json({
        success:true,
        access_token:token,
        data:{
            name:user.name,
            email:user.email,
        }
    })
}
const isTokenIncluded = req =>{
    console.log(req.headers.authorization);
    return (req.headers.authorization&&req.headers.authorization.startsWith("Bearer"));
}
//javascrpt  cok iyi bir dil ama tek sorunu startsWith yaptım onda diğer diller gibi hatatı gossterse cok iyi olurdu onuda kabul ediyor amaarka planda program patlıyot
//// hocam hersey için sagolun sizide yordum bakarım eklenti varmı diye kolay gelsin
//sagolun hocam tekrardan
//hocam yukardaki startwithde diikatetmedim onda sorun neydi tam olarak 
// anladım s takısı yüzünden hocam visual studyo kodda bu uyumsuz kodları programa gore gosteren bir eklenti var mı 
// c# ve diger dilerde alakasız bişey yazınca sorun cıkıyor javascripte ne yapabilirim bunun için 
//mesele startwswith yazunca ustunde  uyarı verse bilmiyorum ama şöyle bakılabilir
//hocam o zaman bu sekilde sekilde de yapsak olmaz mı bişey dusundum ama en iyisi sizin yondem 
const getAccesTokenFromHeader=req=>{
    
    const authorization=req.headers.authorization;
    
    const access_token=authorization.split(":")[1]; 
    // burada parçaya ayırıp diğer parçayı alıyorum bitişik olduğundan arada boşluk yok seninki işe yaramamış
    // di
   //anladım hocam
   // authorization dan gelen veri şöyle Bearer:abc gibi sen boşluktan bölersen bölünmez bitişik çünkü
   // : dan bölersen iki parça olur Bearer: abc şeklinde
    // console.log(authorization)
    //const access_token=authorization.split(" ")[1];
    // const access_token = authorization.slice(7);
     //  artık çalışır // olmaz çünkü string dönüyor array dönen kısım rawHeaders ikisi farklı
     // id girmeni istiyor onu halledersin
    //console.log(req);
    // console.log(access_token);
    return access_token;
}
module.exports={sendJwtToClient,isTokenIncluded,getAccesTokenFromHeader};

// burada kodunu modül dışına aktarırken senJwtToClient olarak göndermissin dolayısıyla 
// const sendJwtToClient = require("token_helper...") diye çağıramassın
// modül fonksiyonunu yada değişkenini dışarıda kullanırken 
// const {fonksiyon_adi, degisken_adi} = require("moduladi") şeklinde çağırman lazım
// diğer türde import ile çağıracaksan da benzer şey geçerli export default değilse (react için geçerli yada type:module yazarsan)
// import {fonksiyon_adi, degisken_adi... gibi} from "modul" diye çağırırsın
// çalışıyorsa bana müsaade kolay gelsin :D
//autosave yi kapa bence :d