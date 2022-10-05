  class Network{
    constructor(layers, step, f, df){
      this.step = step
      this.layers = layers
      this.weights = []
      this.f = f
      this.df = df
      for (let i = 1; i < layers.length; i++){
        let layer = layers[i]
        let l = []
        for (let neuron = 0; neuron < layer; neuron++){
          let prevLayer = layers[i - 1]
          let n = []
          for (let front = 0; front < prevLayer; front++){
            n.push(Math.random())
          }
          l.push(n)
        }
        this.weights.push(l)
      }
    }

    input(input, output){
      input = [...input]
      let neurons = [input]
      for(let l=0; l<this.weights.length; l++){
        let layer = this.weights[l]
        let neuronv = []
        for(let n=0; n < layer.length; n++){
          let nw = layer[n]
          let v = 0
          for (let c = 0; c < nw.length; c++){
            v += neurons[l][c] * nw[c]
          }
          neuronv.push(this.f(v))
        }
        neurons.push(neuronv)
      }

      if (typeof output !== 'undefined'){
        let ds = 0

        for(let l = this.weights.length-1; l >= 0; l--){
          let layer = this.weights[l]
          let d = 0
          let dc = []
          
          for(let n = 0; n < layer.length; n++){
            let a = 0

            if (ds == 0){
              a = neurons[l+1][n] - output[n]
              console.log(a)
              ds = []
            } else {
              for(let i = 0; i < ds.length; i++){
                a += this.weights[l+1][i][n] * ds[i]
              }
            }

            d = a*this.df(neurons[l+1][n])
            let neuron = layer[n]

            for(let c = 0; c < neuron.length; c++){
              neuron[c] -= this.step * d * neurons[l][c]
            }
            dc.push(d)
          }
          ds = [...dc]
        }
      }
      return neurons[neurons.length-1]
    }
  }
