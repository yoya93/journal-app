import { fileUpload } from "../../helpers/fileUpload";

describe("Pruebas en  fileUpload", () => {
  test("deben de cargar un archivo y retornar la url", async () => {
    const resp = await fetch(
      "https://thumbs.dreamstime.com/z/el-mostrar-de-la-mano-tama%C3%B1o-peque%C3%B1o-29244514.jpg"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.jpg"); // los pasos anteriores son para poder crearme un file

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");
  });
}, 20000);
