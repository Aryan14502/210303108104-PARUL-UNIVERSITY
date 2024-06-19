const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const registerCompany = async (req, res) => {
  try {
    const registerResponse = await axios.post('http://20.244.56.144/test/register', {
      companyName: "goMart",
      ownerName: "Aryan Deepakkumar Mori",
      rollNo: "210303108104",
      ownerEmail: "210303108104@paruluniversity.ac.in",
      accessCode: "QeYQhl"
    });

    const { clientID, clientSecret } = registerResponse.data;

    const authResponse = await axios.post('http://20.244.56.144/test/auth', {
      companyName: "goMart",
      clientID: clientID,
      clientSecret: clientSecret,
      ownerName: "Aryan Deepakkumar Mori",
      ownerEmail: "210303108104@paruluniversity.ac.in",
      rollNo: "210303108104"
    });

    res.json({
      registrationData: registerResponse.data,
      authTokenData: authResponse.data
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.post('/register-and-auth', registerCompany);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
