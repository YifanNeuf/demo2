import {useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ProductStep2 from "../elements/productStep2";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DonateList = () => {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user){
    navigate("/loginin");
  }
  // console.log(user.uid)
  const donPageStyle = {
    marginTop: "70px",
  };
  const nextStepStyle = {
    marginLeft: "10px",
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };

  const returnStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };

  const stepBtnStyle = {
    marginBottom: "40px",
    marginTop: "20px",
    textAlign: "center",
  };

  let donateCartList = JSON.parse(localStorage.getItem("donateCart"));
  let donateListForPriceTotal = JSON.parse(localStorage.getItem("donateList"));
  const [donateList, setDonateList] = useState(donateListForPriceTotal);
  const [total, setTotal] = useState(0);
  // const [subtotal, setSubtotal] = useState([]);
  const [state, setState] = useState(true);

  // console.log(donateListForPriceTotal);
  if (state) {
    let value = 0;
    donateListForPriceTotal.forEach(item => {
      value += Number(item.price * item.count)
      setTotal(value);
    });
    setState(false);
  }

  return (
    <div>
      <Navbar />
      <div style={donPageStyle}>
      <TitleSec name="認購物資列表" />
      <Container>
      <Row style={{ fontSize: "35px", marginBottom: "30px" }}>
          <ProgressBar
            style={{
              position: "absolute",
              marginTop: "19px",
              zIndex: "1",
              width: "1070px",
              marginLeft: "120px",
            }}
            now={66.5}
          ></ProgressBar>
          <Col style={{ textAlign: "center", zIndex: "2" }}>
            <FontAwesomeIcon
              style={{
                color: "#26aa50",
                marginRight: "60px",
                backgroundColor: "white",
                borderRadius: "100%",
              }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginRight: "60px" }}>開始</span>
          </Col>
          <Col style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{ color: "#26aa50", marginLeft: "120px", backgroundColor: "white", borderRadius: "100%" }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginLeft: "92px" }}>
              選擇認購物資
            </span>
          </Col>
          <Col style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{ color: "lightgray", marginLeft: "150px" }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginLeft: "137px" }}>
              填寫資料
            </span>
          </Col>
          <Col style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{ color: "lightgray", marginLeft: "180px" }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginLeft: "167px" }}>
              確認付款
            </span>
          </Col>
        </Row>
        <TitleStep name="STEP2&nbsp;-&nbsp;填寫資料" />
        {donateCartList ? (
          donateCartList.map((item, index) => (
            <>
              <ProductStep2
                key={index}
                id={item.id}
                name={item.name}
                pic={item.pic}
                store={item.store}
                price={item.price}
                quantity={item.quantity}
                description={item.description}
                charity={item.charity}
                donateList={donateList}
                setDonateList={setDonateList}
                state={state}
                setState={setState}
              />
            </>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              marginTop: "35px",
            }}
          >
            ※請返回上一頁選擇需求物資。
          </p>
        )}
        <div style={stepBtnStyle}>
          <p
            style={{
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              marginTop: "35px",
            }}
          >
            ※總計：${total}
          </p>
          <Link to="/donateList">
            <button
              style={returnStepStyle}
              onClick={() => {
                localStorage.removeItem("donateCart");
                localStorage.removeItem("donateList");
              }}
            >
              返回
            </button>
          </Link>
          {donateCartList !== null ? (
            <Link to="/donateListThird" state={{ totalAmount: total }}>
              <button style={nextStepStyle}>下一步</button>
            </Link>
          ) : (
            ""
          )}
        </div>
        {/* <div>
          <ProductStep2 />
        </div>
        <div>
          <ProductStep2 />
        </div>
        <div style={stepBtnStyle}>
          <div style={returnStepStyle}>
            <ButtonLink to="/donate" name="返回" />
          </div>
          <div style={nextStepStyle}>
            <ButtonLink to="/donatestep3" name="下一步" />
          </div>
        </div> */}
      </Container>
    </div>
    </div>
  );
};

export default DonateList;
