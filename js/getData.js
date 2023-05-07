const getProducts = async () =>{

const response =await fetch ('data/stock.json')
const data =await response.json()
return data
}

const getValor = async () => {
    const url = 'https://api.bluelytics.com.ar/v2/latest';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const blueValueAvg = data.blue.value_avg;
        console.log(blueValueAvg);
        return blueValueAvg;
      } else {
        throw new Error(`Error al realizar la solicitud: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  };
/*
const getValor = async () =>{

const url = 'https://api.bluelytics.com.ar/v2/latest';
fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error al realizar la solicitud: ${response.status}`);

  })
  .then(data => {
    
    const blueValueAvg = data.blue.value_avg;
    console.log(blueValueAvg)
    return blueValueAvg
    })
  .catch(error => {
    console.error(error);
    return valordolar

  });

}*/