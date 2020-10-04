import cloudinary from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "journal-123",
  api_key: "437543573998566",
  api_secret: "Gqb7YAZ5G_BVp1ym8hc9e36ueKU",
});

describe("Pruebas en  fileUpload", () => {
  test("deben de cargar un archivo y retornar la url", async (done) => {
    const resp = await fetch(
      "https://thumbs.dreamstime.com/z/el-mostrar-de-la-mano-tama%C3%B1o-peque%C3%B1o-29244514.jpg"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.jpg"); // los pasos anteriores son para poder crearme un file

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // Borrar imagen por ID
    const segments = url.split("/");
    const imgId = segments[segments.length - 1].split(".")[0];
    cloudinary.v2.api.delete_resources(imgId, {}, () => {
      done();
    });
  });
}, 20000);
