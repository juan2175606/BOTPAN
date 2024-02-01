
require('dotenv').config()
const axios = require('axios')


const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')
const QRportal = require('@bot-whatsapp/portal')

const menuAPI = async () => {  
    const config ={
        method: 'get',
        url: 'https://api-74xis.strapidemo.com/api/menus',
        headers: {
            'Authorization': `Bearer ${process.env.STRAPI_API}`
        }
    };

    const {data} = await axios(config).then((i) => i.data)
    return data.map(m=> ({body: [`*${m.attributes.name}:* ${m.attributes.description}`, `*Precio:* ${m.attributes.price} USD`].join('\n')}))

}

const flujoComprar = addKeyword(['quiero comprar','asesor','asesor','quiero hablar con alguien','comprar'])
.addAnswer('Agradecemos tu interés, en breves momentos un asesor de HOROPAN SAS se comunicará contigo para brindarte la información que necesitas.')

const flujoUbicacion = addKeyword(['dónde están ubicados','ubicacion','donde se encuentran','donde se encuentran ubicados'])
.addAnswer('Estamos ubicados en Bogotá en la dirección: carrera 78a #72b-62 sur , Bosa Carlos Alban, hacemos envios a nivel nacional.')
.addAnswer('Escribe *menu* para visualizar el menú principal')

const flujoHorno = addKeyword(['horno','hornos','horno panaderia'])
.addAnswer('Fabricamos horno estáticos y rotatorios en acero inoxidable desde 6 a 40 bandejas, la cantidad de carros extriables dependerá de la cantidad de bandejas (El horno de 6 bandejas es estatico y no tiene carro extraible), las bandejas vienen por separado (Costo de la docena: *470.000*), este horno funciona a 110V, tiene sistema de aislamiento del CO2 que permite que el producto no se contamine y proteger al usuario, el sistema que emplea para elevar la temperatura es gas natural o propano controlado por el sistema eléctrico.')
.addAnswer('Información',{
    media: 'https://i.imgur.com/szEU9ZJ.jpeg'
})
.addAnswer(['Horno 10 bandejas rotatorio',"*Precio:* 15.000.000"])
.addAnswer(['Horno 10 bandejas estático',"*Precio:* 14.000.000"])
.addAnswer(['Horno 12 bandejas rotatorio',"*Precio:* 16.000.000"])
.addAnswer(['Horno 15 bandejas rotatorio',"*Precio:* 19.000.000"])
.addAnswer(['Horno 18 bandejas rotatorio',"*Precio:* 21.000.000"])
.addAnswer(['Horno 24 bandejas rotatorio',"*Precio:* 27.000.000"])
.addAnswer(['Horno 40 bandejas rotatorio',"*Precio:* 45.000.000"])
.addAnswer('Te envio imagen del horno rotatorio',{
    media: 'https://i.imgur.com/Ymy4QdE.jpeg'
})
.addAnswer(' ',{
    media: 'https://i.imgur.com/sV3iyz0.jpeg'
})
.addAnswer(' ',{
    media: 'https://i.imgur.com/ITrkoJ7.jpeg'
})
.addAnswer(' ',{
    media: 'https://i.imgur.com/4hNGqNa.jpeg'
})
.addAnswer('Escriba *medidas diferentes* Si te interesa un horno sobre otros tamaños')
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')


const flujoVitrina = addKeyword(['vitrina','vitrina seca','vitrina refrigerada','vitrinas','vitrina panaderia','vitrina pasteleria'])
.addAnswer('Vitrina refrigerada en acero inoxidable, logo personalizado e iluminación LED, doble entrepaño para evitar empañamiento , vitrina seca en acero inoxidable, logo personalizado e iluminación LED')
.addAnswer(['Vitrina refrigerada (acero inoxidable) a medidas Largo:1,2m , Alto: 1,3m, F:60cm',"*Precio:* 6.100.000"])
.addAnswer(' ',{
    media: 'https://i.imgur.com/D8njhd0.jpeg'
})
.addAnswer(['Vitrina refrigerada (acero inoxidable con recubrimiento en madera) a medidas Largo:1,2m , Alto: 1,3m, F:60cm',"*Precio:* 6.750.000"])
.addAnswer(['Vitrina seca (acero inoxidable) a medidas Largo:1,2m , Alto: 1,3m, F:60cm',"*Precio:* 4.500.000"])
.addAnswer(' ',{
    media: 'https://i.imgur.com/Dd2z68v.jpeg'
})
.addAnswer(['Vitrina seca  (acero inoxidable con recubrimiento en madera) a medidas Largo:1,2m , Alto: 1,3m, F:60cm',"*Precio:* 5.150.000"])
.addAnswer(['Vitrina Canastero',"*Precio:* 16.000.000"])
.addAnswer(['Set vitrinas (Acero inoxidable) Seca, refrigerada y punto de pago',"*Precio:* 13.000.000"])
.addAnswer(' ',{
    media: 'https://i.imgur.com/8EYPh7b.jpeg'
})
.addAnswer(['Set vitrinas (Acero inoxidable con recubrimiento en madera) Seca, refrigerada y punto de pago',"*Precio:* 15.000.000"])
.addAnswer('Información',{
    media: 'https://i.imgur.com/niEC4r0.jpeg'
})
.addAnswer('Escriba *medidas diferentes* Si te interesa cotizar vitrina sobre medidas especificas')
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')




const flujoMojadora = addKeyword(['mojadora','amasadora','mojadoras','amasadoras'])
.addAnswer("Mojadora/amasadora viene en capacidades de 1/2@, 1@ y 2@, estas vienen de 1 velocidad a 110V y 2 velocidades 220V,  motor brasileño con 1 año de garantia")
.addAnswer('Información',{
    media: 'https://i.imgur.com/FW0rveX.jpeg'
})
.addAnswer(['Mojadora 1/2@',"*Precio:* 5.800.000"])
.addAnswer(['Mojadora 1@',"*Precio:* 7.000.000"])
.addAnswer(['Mojadora 2@',"*Precio:* 11.000.000"])
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')



const flujoBatidora = addKeyword(['batidora','batidora industrial','batidoras','batidoras industriales'])
.addAnswer("Batidora industrial viene en capacidades de 10L, 20L, 30L y 40L, 3 velocidades con motor de 1hp, viene con sus accesorios: Paleta, gancho y globo en acero inoxidable, con 1 año de garantia")
.addAnswer('Información',{
    media: 'https://i.imgur.com/sV5EkBu.jpeg'
})
.addAnswer(['Batidora 10L',"*Precio:* 2.500.000"])
.addAnswer(['Batidora 20L',"*Precio:* 3.500.000"])
.addAnswer(['Batidora 30L',"*Precio:* 5.000.000"])
.addAnswer(['Batidora 40L',"*Precio:* 10.000.000"])
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')


const flujocortadora = addKeyword(['cortadora','cortadora de pan','cortadoras','cortadoras de pan'])
.addAnswer("Cortadora de pan en acero inoxidable, Para 36 cortes, accesorios como: Cuchillas y tazón en acero inoxidable, recubierta con pintura electroestática, con 1 año de garantia")
.addAnswer('Información',{
    media: 'https://i.imgur.com/JV5xOmB.jpeg'
})
.addAnswer(['Cortadora 36 cortes',"*Precio:* 2.500.000"])
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')



const flujoMeson = addKeyword(['meson','meson de produccion','mesones','mesones de produccion'])
.addAnswer("Mesón de producción en acero inoxidable con base reforzada, , con 1 año de garantia")
.addAnswer('Información',{
    media: 'https://i.imgur.com/9YAskHf.jpeg'
})

.addAnswer(['Mesón de producción Largo:1.5m , Alto: 90cm, F:90cm',"*Precio:* 1.800.000"])
.addAnswer('Escriba *medidas diferentes* Si te interesa cotizar mesón de producción sobre medidas especificas',{delary: 1000})
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')



const flujoGrequero =addKeyword(['grequero','grequeros','cocina','cocinas'])
.addAnswer("Grequero en acero inoxidable, 4 puestos, quemador, poseta y con entrepaños, con 1 año de garantia")
.addAnswer('Información',{
    media: 'https://i.imgur.com/UXLdPEa.jpeg'
})
.addAnswer('Grequero Largo:2m , Alto: 2m, F:60cm')
.addAnswer("*Precio:* 5.000.000")
.addAnswer('Escriba *medidas diferentes* Si te interesa cotizar un grequero sobre medidas especificas',{delary: 1000})
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')



const flujoFreidor = addKeyword(['freidor','freidores'])
.addAnswer("Freidor en acero inoxidable, Entrepaños, Canasta escurridora, Diseño de logo personalizado con 1 año de garantia")
.addAnswer('Freidor 50L ')
.addAnswer("*Precio:* 2.500.000")
.addAnswer(' ',{
    media: 'https://i.imgur.com/ocU0ywX.jpeg'
})
.addAnswer('Freidor 50L de control automatico')
.addAnswer("*Precio:* 4.500.000")
.addAnswer(' ',{
    media: 'https://i.imgur.com/MNfbG1Q.jpeg'
})
.addAnswer('Escriba *medidas diferentes* Si te interesa cotizar un freidor sobre medidas especificas')
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')



const flujoCuarto = addKeyword(['cuarto','cuarto de crecimiento','Cuato de fermentación'])
.addAnswer("Cuarto de crecimiento en acero inoxidable, viene en diferentes dimensiones, manual y automatico, Diseño de logo personalizado con 1 año de garantia")
.addAnswer(' ',{
    media: 'https://i.imgur.com/YW8RP9t.jpeg'
})
.addAnswer('Cuarto de crecimiento manual de 12 bandejas')
.addAnswer("*Precio:* 1.500.000")
.addAnswer('Cuarto de crecimiento manual de 24 bandejas')
.addAnswer("*Precio:* 2.500.000")
.addAnswer('Cuarto de crecimiento manual de 36 bandejas')
.addAnswer("*Precio:* 3.000.000")
.addAnswer('Escriba *medidas diferentes* Si te interesa cotizar un cuarto de crecimiento de diferentes dimensiones o el cuarto de crecimiento de control automatico')
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')

//const QRPortalWeb = require('@bot-whatsapp/portal')
//const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoCatalogo = addKeyword(['quiero el catalogo','catalogo','catálogo'])
.addAnswer('Adjuntamos Nuestro catalogo',{
    media: 'https://sparkly-jalebi-615ee5.netlify.app/pdf/catalogo.pdf'
})
.addAnswer('Adjuntamos Nuestro catalogo')
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.')


const flujoCotizar = addKeyword(['quiero cotizar','cotizar'])


const flujoOtro = addKeyword(['otras solicitudes','otros'])
.addAnswer('En unos momentos uno de nuestros asesores se comunicará contigo para brindarte información detallada sobre tu solicitud.')

const flujoFinanciacion = addKeyword(['financiacion','planes de financiacion','credito','financiación'])
.addAnswer('Financiación maxima del 30% del equipo, no aplica para montajes completos, Solo aplica para Bogotá y sus alrededores, la aprobación de este credito está sujeto a estudio crediticio en las centrales de riesgo, financiación maxima a 6 meses. (Tener en cuenta que los costos de un equipo financiado son diferentes a un equipo de contado) ')
.addAnswer('Escriba *Quiero comprar* Si te interesa adquirir uno o varios de nuestros productos, de lo contrario escribe el nombre del producto para tener información y su precio.',{delary: 1000})


const flujoEquipos = addKeyword(['adquirir equipos','adquirir'])
.addAnswer('En HOROPAN SAS se fabrican equipos en acero inoxidable como: Hornos estaticos y rotatorios. Grequeros, Vitrinas seca y refrigeradas (Personalizadas), Mojadoras, Batidoras, Cortadoras, Freidores, Mesón de producción , Escabiladeros')
.addAnswer('Escribe *Quiero Catalogo* Si te interesaria que te enviemos el catalogo de HOROPAN SAS')
.addAnswer('Escribe *Quiero cotizar* Si te interesa hablar con un asesor de HOROPAN SAS para cotizar')
.addAnswer('Escribe *Otros* Si te interesa cotizar equipos'
,null,null,[flujoCatalogo,flujoCotizar,flujoOtro])



const flujoGarantia = addKeyword(['servicio de garantia','garantia'])
.addAnswer('¿Cual es Nombre completo?',{capture:true},(ctx)=>{
    console.log('Mensaje entrante: ',ctx.body)
})
.addAnswer('¿Fecha de compra?',{capture:true},(ctx)=>{
    console.log('Mensaje entrante: ',ctx.body)
})
.addAnswer('Describa la falla del equipo, de ser necesario adjunte fotos y videos',{capture:true},(ctx)=>{
    console.log('Mensaje entrante: ',ctx.body)
})
.addAnswer('En unos momentos uno de nuestros asesores se comunicará contigo para indicarte el paso a seguir.')


//const flujoPedido =addKeyword(['pedir','pedido'])
//.addAnswer('¿Como desea pagar? en efectivo o online?',null,null,[flujoEfectivo,flujoOnline])

const flujoPrincipal= addKeyword(['buen dia','Buenos días','hola', 'ole', 'alo','buenos dias','buenas noches','Buenas tardes','menu','volver a empezar'])
.addAnswer(['HOROPAN SAS','¡Bienvenido al chat de HOROPAN SAS - Fabricadores de Equipos de Panadería! 🍞 Aquí encontrarás todo lo que necesitas para llevar tus creaciones al siguiente nivel.','¡Haz tus preguntas, comparte ideas y descubre lo mejor en equipos de panadería! ¡Vamos a hornear éxitos juntos! 🎉'])
.addAnswer('Nuestros horarios de atencion son: Lunes a viernes de 7-5pm y sabado de 7-12pm. Dejanos tu mensaje y cuando uno de nuetros asesores esté disponible te responderemos y daremos respuesta a tu solicitud')
.addAnswer('Escriba Menú en cualquier momento para regresar al menú principal')

//.addAnswer('Por favor escribe tu solicitud:', null,(ctx,{flowDynamic})=>{
//   setTimeout(async ()=>{ 
//   await flowDynamic([{body:'*Comprar Equipos*'},{body:'*Servicio de Garantia*'},{body:'*Otras solicitudes*'}])
//   },500)
//})
.addAnswer('Escribe *Adquirir equipos* Si te interesa cotizar equipos HOROPAN SAS')
.addAnswer('Escribe *Servicio de Garantia* Si te interesa gestionar la garantia para tu equipo HOROPAN SAS')
.addAnswer('Escribe *Financiación* Si te interesa conocer sobre nuestros planes de financiación')
.addAnswer('Escribe *Otras solicitudes* Si te interesa cotizar equipos'
,null,null,[flujoEquipos,flujoGarantia,flujoOtro,flujoFinanciacion,flujoUbicacion])


const flujosecundario = addKeyword(['gracias']).addAnswer(['Fue un gusto hablar contigo, estaremos aqui pendiente de cualquier duda que pueda tener'])

const main = async () => {

    const adapterDB = new DBProvider()
    const adapterFlow = createFlow([flujoComprar,flujoCuarto,flujoFreidor,flujoGrequero,flujoMeson,flujocortadora,flujoBatidora,flujoMojadora,flujoVitrina,flujoHorno,flujoPrincipal,flujosecundario])
    const adapterProvider = createProvider(WsProvider)

    createBot(
        {
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        }
    )
}

QRportal()
main()
