import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import "@testing-library/jest-dom/extend-expect";
import Swal from "sweetalert2";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
configure({ adapter: new Adapter() });

const notScroll = () => {};

Object.defineProperty(window, "scrollTo", {
  value: notScroll,
  writable: true,
});

// las acciones asincronas no necesitan evaluarse con el dispacher es directamente : Example login ,logout

//Los mock no cambian el reducer solo simulan los cambios para poder hacer las test
//el get State del store no me va a dar el estado del reducer sino el estado del initial state que yo le pase

jest.mock("sweetalert2", () => ({
  fire: jest.fn,
  close: jest.fn,
}));
