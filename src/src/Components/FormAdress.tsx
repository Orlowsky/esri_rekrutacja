import React, { CSSProperties } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
require('dotenv').config()
type Inputs = {
  ulica: string;
  numer: string;
};

const FormAdress = (props: { setDataUrl: any; clearDataUrl: any }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let adressUlica: string = `ulica+=+'${data.ulica}'`;
    let adressNumer: string = ``;
    if (data.numer.includes("%")) {
      adressNumer = `+and+numerPorza+like+'${data.numer}'`;
    } else if (data.numer !== "") {
      adressNumer = `+and+numerPorza+=+'${data.numer}'`;
    } else {
      adressNumer = ``;
    }
   
    props.setDataUrl(adressUlica + adressNumer);
  };
  const onClickChange = () => {
    props.clearDataUrl();
    reset();
  };

  return (
    <div style={{ width: "100%" }}>
      <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={flexDiv}>
          <label style={styleLabel}>{process.env.REACT_APP_LABEL_ULICA}</label>
          <input
            style={styleInput}
            {...register("ulica", { required: true })}
          />
        </div>
        <div style={flexDiv}>
          <label style={styleLabel}>{process.env.REACT_APP_LABEL_NUMER}</label>
          <input style={styleInput} {...register("numer")} />
        </div>

        {errors.ulica && <span>Proszę o podanie ulicy</span>}
        <div style={flexDivButtons}>
          <input style={{ marginRight: "5px" }} type="submit" value="Szukaj" />
          <button type="button" onClick={onClickChange}>
            Wyczyść dane
          </button>
        </div>
      </form>
    </div>
  );
};

const styleForm: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const flexDiv: CSSProperties = {
  display: "flex",
  width: "80%",
  margin: "5px",
};
const styleLabel: CSSProperties = {
  width: "30%",
  textAlign: "left",
};
const styleInput: CSSProperties = {
  width: "70%",
};
const flexDivButtons: CSSProperties = {
  display: "flex",
  width: "80%",
  justifyContent: "flex-end",
  margin: "5px",
};

export default FormAdress;
