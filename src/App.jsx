import styleApp from "./stylePages/App.module.css";

import BarraPesquisa from "./components/BarraPesquisa";

import degreesCelsius from "./img/degrees Celsius.png";
import imgHumidade from "./img/umidade.png";
import imgvento from "./img/vento.png";
import imgpressao from "./img/pressao1.png";
import imgChuva from "./img/Chuva.png";
import imgNublado from "./img/Nublado.png";
import imgEnsolarado from "./img/Ensolarado.png";

import { useEffect, useState } from "react";

function App() {

  const [Errocidade, setErrocidade] = useState(false);

  const [tempo1, setTempo1] = useState(null);

  const [Cidade, setCidade] = useState("");
  const [Pais, setPais] = useState(null);

  const [Temperatura, setTemperatura] = useState("");
  const [TemperaturaMin, setTemperaturaMin] = useState("");
  const [TemperaturaMax, setTemperaturaMax] = useState("");
  const [Humidade, setHumidade] = useState("");
  const [VlcVento, setVlcVento] = useState("");
  const [Pressao, setPressao] = useState("");

  const [Pesquisa, setPesquisa] = useState("");

  const HandlePesquisa = (event) => {
    setPesquisa(event.target.value);
  }

  let apikey = "015d353fec5aba233c320e10ddd7aa86";

  function climaAgora() {

    if (Pesquisa !== null && Pesquisa !== undefined && Pesquisa !== "") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Pesquisa}&appid=${apikey}`, {
        method: 'GET'
      })
        .then((res) => res.json())
        .then((data) => {
          setTemperatura(Math.round(data.main.temp - 273.15));
          setTemperaturaMax(Math.round(data.main.temp_max - 273.15));
          setTemperaturaMin(Math.round(data.main.temp_min - 273.15));
          setHumidade(data.main.humidity);
          setPressao(data.main.pressure);
          setVlcVento(data.wind.speed);
          setCidade(data.name);
          if (data.weather[0].main == "Clouds") {
            setTempo1(imgNublado)
          } else if (data.weather[0].main == "Clear") {
            setTempo1(imgEnsolarado)
          } else if (data.weather[0].main == "Rain") {
            setTempo1(imgChuva)
          }
          setPais(`https://flagsapi.com/${data.sys.country}/flat/32.png`);
          setErrocidade(false);
        })
        .catch((error) => {
          setErrocidade(true);
        });
    }
  }

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        })
    }
  }, [])

  useEffect(() => {

    if (latitude !== null && longitude !== null) {

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
          setTemperatura(Math.round(data.main.temp - 273.15));
          setTemperaturaMax(Math.round(data.main.temp_max - 273.15));
          setTemperaturaMin(Math.round(data.main.temp_min - 273.15));
          setHumidade(data.main.humidity);
          setPressao(data.main.pressure);
          setVlcVento(data.wind.speed);
          setCidade(data.name);
          if (data.weather[0].main == "Clouds") {
            setTempo1(imgNublado)
          } else if (data.weather[0].main == "Clear") {
            setTempo1(imgEnsolarado)
          } else if (data.weather[0].main == "Rain") {
            setTempo1(imgChuva)
          }
          setPais(`https://flagsapi.com/${data.sys.country}/flat/32.png`);
        })
    }

  }, [latitude, longitude])



  return (
    <div>
      <div className={styleApp.blocoPrincipal}>
        <div className={styleApp.bloco1}>
          <div className={styleApp.blocoBarraPesquisa}><BarraPesquisa funcao={HandlePesquisa} pesquisa={climaAgora} /></div>
          {Errocidade && (
            <div style={{ fontSize: "15px", color: "red", width: "100%", height: "5%", display: "flex", justifyContent: "center", alignItems: "center" }}>Cidade não encontrada</div>
          )}
          <div className={styleApp.cidade}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span>{Cidade}</span><span>&nbsp;</span><span>|</span><span>&nbsp;</span><span><img src={Pais} alt="" /></span></div>
          </div>
          <div style={{ width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div><span style={{ fontSize: "70px" }}>{Temperatura}</span><span><img className={styleApp.degreesCelsiusimg} src={degreesCelsius} alt="" /></span></div>
          </div>
          <div className={styleApp.Maxmin}>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
              <div><span>Max:</span><span>&nbsp;</span><span>{TemperaturaMax}</span><span><img style={{ width: "15px" }} src={degreesCelsius} alt="" /></span></div>
              <div><span>Min:</span><span>&nbsp;</span><span>{TemperaturaMin}</span><span><img style={{ width: "15px" }} src={degreesCelsius} alt="" /></span></div>
            </div>
          </div>
        </div>
        <div className={styleApp.bloco2}>
          <div className={styleApp.bloco3}>
            <div className={styleApp.titulodestaques} >
              <div className={styleApp.margin}>
                <span >Destaques de hoje</span>
              </div>
            </div>
            <div className={styleApp.bloco4}>
              <div style={{ width: "98%", height: "95%", display: "flex" }}>
                <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                  <div className={styleApp.blocoDescricao}>
                    <div style={{ width: "100%", height: "30%", display: "flex", alignItems: "center" }}><span style={{ marginLeft: "10px" }}>Umidade</span></div>
                    <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className={styleApp.txtdestaque}>
                        <span>{Humidade}</span>
                        <span>%</span>
                        <span>&nbsp;</span>
                        <span>|</span>
                        <span>&nbsp;</span>
                        <div><img style={{ width: "22px" }} src={imgHumidade} alt="" /></div>
                      </div>
                    </div>
                  </div>
                  <div className={styleApp.blocoDescricao}>
                    <div style={{ width: "100%", height: "30%", display: "flex", alignItems: "center" }}><span style={{ marginLeft: "10px" }}>Vento</span></div>
                    <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className={styleApp.txtdestaque}>
                        <span>{VlcVento}</span>
                        <span>m/s</span>
                        <span>&nbsp;</span>
                        <span>|</span>
                        <div><img style={{ width: "22px" }} src={imgvento} alt="" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                  <div className={styleApp.blocoDescricao}>
                    <div style={{ width: "100%", height: "30%", display: "flex", alignItems: "center" }}><span style={{ marginLeft: "10px" }}>Pressão</span></div>
                    <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className={styleApp.txtdestaque}>
                        <span>{Pressao}</span>
                        <span>&nbsp;</span>
                        <span>hPa</span>
                        <span>&nbsp;</span>
                        <span>|</span>
                        <span>&nbsp;</span>
                        <div><img style={{ width: "22px" }} src={imgpressao} alt="" /></div>
                      </div>
                    </div>
                  </div>
                  <div className={styleApp.blocoDescricao}>
                    <div style={{ width: "100%", height: "30%", display: "flex", alignItems: "center" }}><span style={{ marginLeft: "10px" }}>Nuvens</span></div>
                    <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className={styleApp.txtdestaque}>
                        <div><img style={{ width: "62px" }} src={tempo1} alt="" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
