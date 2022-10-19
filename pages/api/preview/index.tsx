
const handler = async (req:any, res:any) => {
    const {secret, id, type} = req.query
    
    try {
      if(secret !== process.env.PREVIEW_TOKEN) {
        res.status(404).send('invalid token')
        return
      }
      res.setPreviewData({
        id: id,
        type: type,
      })
      if(type && type == 'reference'){
       
        res.writeHead(307, {
          Location: "/preview/reference",
        })
      } else if(type && type == 'page'){
  
        res.writeHead(307, {
          Location: "/preview/page",
        })
      } else if(type && type == 'product'){
        res.writeHead(307, {
          Location: "/preview/product",
        })
      } else (
        res.writeHead(307, {
          Location: "/preview",
        })
      )
      res.end()
    } catch (error) {
      console.log('Something went wrong with preview ===>', error);
      
    }
  }
  
  export default handler