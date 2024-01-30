function updateTrafficLights (road, i) {
    var arrayRoad = [];

    road.forEach(function (item) {
        arrayRoad.push({
            char: item.char,
            vehicle: item.vehicle,
            light: item.light,
            position: item.position
        })
    })

    arrayRoad.forEach(function (item, index) {
        var position = road[index].position || 0;
        if (item.light == 'G' && position == 0) {
            position = 1;
        } else if (item.light == 'O' && position == 0) {
            position = 6;
        } else if (item.light == 'R' && position == 0) {
            position = 7;
        }
        switch (item.light) {
            case 'G':
                if (position >= 5) {
                    arrayRoad[index].light = 'O';
                    arrayRoad[index].position = 0;
                } else {
                    arrayRoad[index].position = position + 1;
                }
                break;
        
            case 'O':
                if (position >= 6) {
                    arrayRoad[index].light = 'R';
                    arrayRoad[index].position = 0;
                } else {
                    arrayRoad[index].position = position + 1;
                }
                break;

            case 'R':
                if (position >= 11) {
                    arrayRoad[index].light = 'G';
                    arrayRoad[index].position = 0;
                } else {
                    arrayRoad[index].position = position + 1;
                }
                break;

            default:
                break;
        }

    });
    return arrayRoad;
}

function moveCar (road) {
    var resultArray = [];

    var nextIsVehicle = false;

    road.forEach(function (item, index) {
        var lightTemp = item.light;
        if (nextIsVehicle) {
            resultArray.push({
                char: 'C',
                vehicle: 'C',
                light: lightTemp,
                position: item.position
            });
            nextIsVehicle = false;
        } else if (item.vehicle == 'C') {
            if (road[index + 1].light == 'R') {
                resultArray.push(item);
                nextIsVehicle = false;
            } else {
                resultArray.push({
                    char: lightTemp || '.',
                    vehicle: '',
                    light: lightTemp,
                    position: item.position
                });
                nextIsVehicle = true;
            }
        } else if (lightTemp) {
            resultArray.push({
                char: lightTemp,
                light: lightTemp,
                position: item.position
            });
        } else {
            resultArray.push({
                char: '.',
                vehicle: '',
                light: ''
            });
        }
    });

    var result = '';

    resultArray.forEach((item, index) => {
        resultArray[index].done = false;
        result += item.char;
    });

    return resultArray;
}

function trafficSimulation(road, n) {
    
    var result;
    var first = [];

    road.split('').forEach(function(item) {
        if (item == 'C') {
            first.push({
                vehicle: item,
                char: item,
                position: item.position
            });
        } else if (item == 'G' || item == 'O' || item == 'R') {
            first.push({
                light: item,
                char: item,
                position: item.position
            });
        } else {
            first.push({
                char: item,
                position: 0
            });
        }
    })

    result = [first];
  
    for (var i = 1; i <= n; i++) {
        if (i == 1) {
            road = updateTrafficLights(result[0], i);
        } else {
            road = updateTrafficLights(road, i);
        }

        road = moveCar(road); 

        result.push(road);
    }
  
    return result;
}


const road = "C...R............G......";
const n = 20;
  
const simulationResult = trafficSimulation(road, n);

simulationResult.forEach((state, index) => {
    var lineResult = '';
    state.forEach(element => {
        lineResult += element.char;
    });
    console.log(`${index}: ${lineResult}`);
});