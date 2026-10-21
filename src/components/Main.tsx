import { Divider } from "antd";
import Header from "./header/Header";
import Todos from "./todos/Todos";
import Footer from "./footer/Footer";

const Main = () => {
  return (
    <div className="w-full max-w-175 h-[calc(100%-40px)] bg-background shadow overflow-hidden">
      <Header />
      <Divider />
      <Todos />
      <Divider />
      <Footer />
    </div>
  );
};

export default Main;
