import path from "path"
import { google } from "googleapis"

const sheets = google.sheets("v4")

async function addRowToSheet(auth, spreadsheetId, values) {
  const request = {
    spreadsheetId,
    range: "Sheet1",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [values],
    },
    auth,
  }

  try {
    const response = (await sheets.spreadsheets.values.append(request)).data
    return response
  } catch (error) {
    console.error(error)
  }
}

const appendToSheet = async (data) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "src/credentials", "credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const authClient = await auth.getClient()
    const spreadsheetId = "1WrhXky7oyMPtGXn_m88_gNI-HYdyrEKxtwjJZjbacg8"

    await addRowToSheet(authClient, spreadsheetId, data)
    return "Datos correctamente agregados"
  } catch (error) {
    console.error(error)
  }
}

export default appendToSheet
