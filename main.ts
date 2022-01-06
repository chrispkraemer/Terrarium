inkyfixed.init()
let tempcount = 0
let tempcurrent = 0
let tempavg = 0
let soilcurrent = 0
let soilavg = 0
fram.init()
while (1) {
    if (input.buttonIsPressed(Button.B)) {
        fram.clear()
        control.reset()
    }
    tempcurrent = input.temperature()
    soilcurrent = pins.analogReadPin(AnalogPin.P0)
    tempavg = ((tempavg * tempcount) + tempcurrent) / (tempcount + 1)
    soilavg = ((soilavg * tempcount) + soilcurrent) / (tempcount + 1)
    tempcount++
    inkyfixed.clear()
    inkyfixed.drawIcon(IconNames.Happy, 200, 10, inkyfixed.Color.Black, inkyfixed.TextSize.Large)
    inkyfixed.drawText("Temp: " + tempcurrent + "C", 10, 10)
    inkyfixed.drawText("Temp Avg: " + Math.roundWithPrecision(tempavg, 2) + "C", 10, 30)
    inkyfixed.drawText("Soil Moisture: " + soilcurrent, 10, 50)
    inkyfixed.drawText("Soil Avg: " + Math.roundWithPrecision(soilavg, 2), 10, 70)
    inkyfixed.drawText("Total Samples: " + tempcount, 10, 90)
    inkyfixed.show()
    control.waitMicros(1000000)
}