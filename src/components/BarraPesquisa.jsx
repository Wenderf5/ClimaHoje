import styleBarraPesquisa from "../styleComponents/BarraPesquisa.module.css";


function BarraPesquisa({funcao, pesquisa}){

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          pesquisa()
        }
      };

    return(
        <div>
            <div style={{display: "flex", width: "100%"}}><input className={styleBarraPesquisa.input} onKeyPress={handleKeyPress} onChange={funcao} type="text" placeholder="Procure por sua cidade ..." /><div onClick={pesquisa} style={{width: "40px", cursor: "pointer", background: "rgb(228, 227, 227)", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}><box-icon name='search'></box-icon></div></div>
        </div>
    )
}

export default BarraPesquisa