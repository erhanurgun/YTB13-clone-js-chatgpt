## JS ve OpenAI GPT-3 API'si Kullanaılarak Mesajlaşma Uygulaması Geliştirilen Proje

- Demo: [https://js-clone-chatgpt.vercel.app](https://js-clone-chatgpt.vercel.app)

### Proje Hakkında

Bu proje, [OpenAI GPT-3 API'si](https://openai.com/blog/openai-api/) kullanılarak geliştirilmiştir. GPT-3 API'si, kullanıcıların yazdıkları metinleri analiz ederek, kullanıcıların yazdıkları metinlere uygun bir cevap üretir. Bu proje de kodlama yardımcısı `code-davinci-002` yapay zeka modeli kullanılarak, kullanıcıların yazdıkları mesajlara uygun kodlama yardımı verilmesi amaçlanmıştır. Dilerseniz `code-davinci-002` modelini `server/server.js:30` dosyasından daha gelişmiş bir model olan `text-davinci-003` modeliyle de değiştirebilirsiniz...

### Proje Nasıl Çalıştırılır?

Proje, [Node.js](https://nodejs.org/en/) ve [npm](https://www.npmjs.com/) kullanılarak geliştirilmiştir. Proje çalıştırılmadan önce, [OpenAI GPT-3 API'si](https://openai.com/blog/openai-api/) kullanılarak bir API anahtarı alınmalıdır. Alınan API anahtarı, `.env` dosyasının içerisindeki `OPENAI_API_KEY` değişkenine atanmalıdır. Tabii bundan önce `.env` dosyası oluşturulmalıdır. `.env` dosyası, `server` klasörünün içerisinde bulunan `.env.example` dosyasından oluşturulabilir. 
Ör:
```bash
cp server/.env.example server/.env
```

Proje, `npm install` komutu ile gerekli kütüphaneler kurulduktan sonra, **server** ve **client** klasörlerinde `npm run dev` komutu ile çalıştırılabilir.


### Proje'ye ait ekran görüntüleri

![Web](/client/assets/ss/web.png)

![Mobil](/client/assets/ss/mobile.png)

#### **NOT:** Bu proje daha sonra faklı amaçlar için **MERN** ile geliştirilecektir!
