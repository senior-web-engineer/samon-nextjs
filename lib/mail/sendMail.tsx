const sendMail = async (subject: string, data: any, to?: string | null) => {
  try {
    const response = await fetch('/api/mail/send', {
      method: 'POST',
      body: JSON.stringify({
        to: to,
        subject: subject,
        ...data,
      }),
    });
    const resData = await response.json();

    return resData;
  } catch (error) {
    return error;
  }
};

export default sendMail;
