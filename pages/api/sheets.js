const {google} = require('googleapis');


export default async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: (process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({
        auth,
        version: 'v4'
    })

    let allValues = [req.body.email]
    req.body.questions.forEach((item, index) => {
        allValues.push(item.selectedIndex)
    })

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: '1ho7ZRZuPvfFk3dBsRXNWnQ8TBa7D_BE9IPHeXld2qkY',
        range: 'A1:P1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [
                allValues
            ]
        }
    })

  return res.status(200).json({})
};