const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const apiSendMail = async (req, res) => {
  const {
    to,
    subject,
    name,
    email,
    phone,
    message,
    attachments,
    location,
    productlist,
    gas,
    environment,
    output,
    numOfDetectors,
    other,
  } = JSON.parse(req.body);
  const { referer } = req.headers;
  if (attachments) {
    for (let att of attachments) {
      att.content = att.content.replace(/(?<=:).*;/, '');
      //(att.content);
    }
  }
  let mailcontent = '';
  let productlistcontent = '';
  let customizeddetectorcontent = '';
  let customizedGasTitle = '';

  if (name) {
    mailcontent += `<p><strong>Name:</strong> ${name}</p>`;
  }
  if (email) {
    mailcontent += `<p><strong>Email:</strong> ${email}</p>`;
  }
  if (phone) {
    mailcontent += `<p><strong>Phone:</strong> ${phone}</p>`;
  }
  if (location) {
    mailcontent += `<p><strong>Location:</strong> ${location.country}, ${location.continent}</p>`;
  }
  if (message) {
    mailcontent += `<p><strong>Message:</strong></p>
    <p>${message}</p>`;
  }
  if (gas) {
    customizedGasTitle = '<h3>Customized Gas Detector Request</h3>';
    customizeddetectorcontent += `<p><strong>Gas:</strong> ${gas}</p>`;
  }
  if (output) {
    customizeddetectorcontent += `<p><strong>Output format:</strong> ${output}</p>`;
  }
  if (numOfDetectors) {
    customizeddetectorcontent += `<p><strong>Number of detectors:</strong> ${numOfDetectors}</p>`;
  }
  if (environment) {
    customizeddetectorcontent += `<p><strong>Environment:</strong> ${environment}</p>`;
  }
  if (other) {
    customizeddetectorcontent += `<p><strong>Other requirements:</strong> ${other}</p>`;
  }

  if (productlist && productlist.length > 0) {
    mailcontent += `
    <p>If you have any questions, don't hesitate to contact us.</p>
    
    <p><strong>Email:</strong> info@samon.se</li></p>
    <p><strong>Phone:</strong> +46-40-155859</li></p>
    `;
    productlistcontent += `<div>
    <h3>Productlist</h3>
    <table>
    <tr style="text-align: left;">
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Categories</th>
      <th>Can be bought from</th>
    </tr>
    `;
    for (let product of productlist) {
      let categorycontent = ``;
      let canBeBoughtFrom =
        product.productFields?.information?.distributors &&
        product.productFields?.information?.distributors.length > 0
          ? 'Distributor'
          : 'Samon';
      for (let category of product.productCategories.edges) {
        categorycontent += `${category.node.name} `;
      }
      //('PRODUCT =>', product);
      productlistcontent += `<tr><td><a href="https://samon.se${product.href}">${product.name}</a></td><td>${product.quantity}</td><td>€${product.price}</td><td>${categorycontent}</td><td>${canBeBoughtFrom}</td></tr>`;
    }
    productlistcontent += `</table></div>`;
  }

  try {
    const msg = {
      to: to || process.env.DEFAULT_EMAIL_TO,
      from: { name: 'Samon', email: process.env.DEFAULT_EMAIL_FROM },
      attachments: attachments || [],
      subject: subject || 'New email from site',
      text: 'Application',
      html: `
      <div>
      <h1>${subject}</h1>
      <br/>
      ${productlistcontent}
      <h3>Contact</h3>
      ${mailcontent}
      <br />
      ${customizedGasTitle}
      ${customizeddetectorcontent || ''}
      <p>Sent from the following page: ${referer}</p>
      </div>
      `,
    };
    const response = await sgMail.send(msg);
    //('apiSendMail =>', response);
    console.log('apiSendMail =>', response);
    res.status(200).json(response[0]);
  } catch (error) {
    console.log('Error apiSendMail =>', error.response.body);
    res.status(200).json({ message: 'success' });
  }
};

export default apiSendMail;
