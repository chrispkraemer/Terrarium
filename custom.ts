// Add your code here
enum OPCODES {
    OPCODE_READ = 3,
    OPCODE_WRITE = 2,
    OPCODE_RDID = 159,
    OPCODE_WREN = 6
}
let intermittent
let bufr = pins.createBuffer(0)
//let base
let timer = 100

//let weight = 100
//let jit = 0 //P2 analog in
let generation: number
let gencopy: number
//let addrlength:number
//% color=190 weight=100 icon="\uf1ec"
let label: number
/*
let arg0: number
let arg1: number
let arg2: number
let arg3: number
let arg4: number
let arg5: number
*/
let customMKArg0: number
let customMKArg1: number
let customMKArg2: number
let customMKArg3: number
let customMKArg4: number
let customMKArg5: number
let customMKArg6: number
let customMKArg7: number
let customMKArg8: number
let customMKArg9: number
let customMKArg10: number
let customMKArg11: number
let customMKArg12: number
let customMKArg13: number
let customMKArg14: number
let customMKArg15: number
let customMKArg16: number
let customMKArg17: number
let customMKArg18: number
let customMKArg19: number
let customMKArg20: number
let customMKArg21: number
let customMKArg22: number
let customMKArg23: number
let customMKArg24: number
let customMKArg25: number
let customMKArg26: number
let customMKArg27: number
let customMKArg28: number
let customMKArg29: number

//% advanced=true
namespace fram {
    //% blockId=fram_begin block="fram|begin"
    export function begin() {
        pins.digitalWritePin(DigitalPin.P9, 1)
        pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)
        pins.spiFormat(8, 0)
        pins.spiFrequency(20000000)
        fram.getDeviceID()
        //fram.writeEnable()

    }
    //% blockId=fram_init block="fram|init"
    export function init() {
        fram.begin()
        //fram.write_buffer(30, pins.createBuffer(0))
        //fram.read_buffer(30, 0)
        //fram.writeEnable()
        fram.write8(1000, 0)

        generation = fram.read8(0)
        //serial.writeLine("initial gen read = " + generation)
        fram.write_number(1000, 0, 0)
        fram.read_number(1000, 0)


        intermittent = true // comment this out to turn off transformations
        //base = true // checkpoint every block
        timer = 100 // checkpoint on timer in ms
        //weight = 100 // checkpoint based on weight of loop
        //jit = 0 // checkpoint based on capacitor was 351
        label = 0
        /*
        arg0 = 0
        arg1 = 0
        arg2 = 0
        arg3 = 0
        arg4 = 0
        arg5 = 0
        */
        customMKArg0 = 0
        customMKArg1 = 0
        customMKArg2 = 0
        customMKArg3 = 0
        customMKArg4 = 0
        customMKArg5 = 0
        customMKArg6 = 0
        customMKArg7 = 0
        customMKArg8 = 0
        customMKArg9 = 0
        customMKArg10 = 0
        customMKArg11 = 0
        customMKArg12 = 0
        customMKArg13 = 0
        customMKArg14 = 0
        customMKArg15 = 0
        customMKArg16 = 0
        customMKArg17 = 0
        customMKArg18 = 0
        customMKArg19 = 0
        customMKArg20 = 0
        customMKArg21 = 0
        customMKArg22 = 0
        customMKArg23 = 0
        customMKArg24 = 0
        customMKArg25 = 0
        customMKArg26 = 0
        customMKArg27 = 0
        customMKArg28 = 0
        customMKArg29 = 0
        gencopy = 5

    }

    /**
     * Write one byte to the address.
     * @param addr to send over serial
     * @param val to send over serial
     */
    //% weight=90
    //% help=fram/write8 blockGap=8
    //% blockId=fram_write8 block="fram|write8 %addr %val"
    export function write8(addr: number, val: number) {
        //pins.digitalWritePin(DigitalPin.P9, 1)
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.spiWrite(OPCODES.OPCODE_WRITE)
        pins.spiWrite(addr >> 8)
        pins.spiWrite(addr & 0xff)
        pins.spiWrite(val)
        pins.digitalWritePin(DigitalPin.P9, 1)
    }

    export function new_test_write(addr: number, val: number) {
        fram.writeEnable()
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.spiWrite(OPCODES.OPCODE_WRITE)
        pins.spiWrite(addr >> 8)
        pins.spiWrite(addr & 0xff)
        pins.spiWrite(val >> 24)
        pins.spiWrite((val >> 16) & 0xff)
        pins.spiWrite((val >> 8) & 0xff)
        pins.spiWrite(val & 0xff)
        pins.digitalWritePin(DigitalPin.P9, 1)
    }

    export function clear() {
        fram.writeEnable()
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.spiWrite(OPCODES.OPCODE_WRITE)
        pins.spiWrite(0 >> 8)
        pins.spiWrite(0 & 0xff)
        for (let i = 0; i < 1000; i++) {
            pins.spiWrite(0)
        }
        pins.digitalWritePin(DigitalPin.P9, 1)
    }

    export function new_test_read(addr: number) {
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.spiWrite(OPCODES.OPCODE_READ)
        pins.spiWrite(addr >> 8)
        pins.spiWrite(addr & 0xff)
        let p1 = pins.spiWrite(255)
        let p2 = pins.spiWrite(255)
        let p3 = pins.spiWrite(255)
        let p4 = pins.spiWrite(255)

        pins.digitalWritePin(DigitalPin.P9, 1)
        return (p1 << 24) | (p2 << 16) | (p3 << 8) | p4
    }

    //% blockId=fram_write_number block="fram|write number %addr %val"
    export function write_number(addr: number, val: number, addrlength: number) {
        //serial.writeLine("Generation = "+generation)
        if (addr == 1) {
            fram.writeEnable()
            pins.digitalWritePin(DigitalPin.P9, 0)
            pins.spiWrite(OPCODES.OPCODE_WRITE)
            gencopy = generation

            if (generation == 1) {
                //serial.writeLine("Writing to far address " + (addr + addrlength))
                pins.spiWrite((addr + addrlength) >> 8)
                pins.spiWrite((addr + addrlength) & 0xff)
            } else {
                //serial.writeLine("Writing to near address" + addr)
                pins.spiWrite(addr >> 8)
                pins.spiWrite(addr & 0xff)
            }
        }
        pins.spiWrite(val >> 24)
        pins.spiWrite((val >> 16) & 0xff)
        pins.spiWrite((val >> 8) & 0xff)
        pins.spiWrite(val & 0xff)
        if (addr == (addrlength - 3)) {
            pins.digitalWritePin(DigitalPin.P9, 1)
        }


    }

    //% blockId=fram_read_number block="fram|read number %addr"
    export function read_number(addr: number, addrlength: number) {
        //serial.writeLine("Generation: "+generation)
        if (addr == 1) {
            pins.digitalWritePin(DigitalPin.P9, 0)
            pins.spiWrite(OPCODES.OPCODE_READ)
            if (generation == 1) {
                pins.spiWrite(addr >> 8)
                pins.spiWrite(addr & 0xff)
            } else {
                pins.spiWrite((addr + addrlength) >> 8)
                pins.spiWrite((addr + addrlength) & 0xff)
            }
        }

        let p1 = pins.spiWrite(255)
        let p2 = pins.spiWrite(255)
        let p3 = pins.spiWrite(255)
        let p4 = pins.spiWrite(255)
        if (addr == (addrlength - 3)) {
            pins.digitalWritePin(DigitalPin.P9, 1)
        }
        return (p1 << 24) | (p2 << 16) | (p3 << 8) | p4
    }

    //% blockId=fram_write_buffer block="fram|write buffer %addr %bufr"
    export function write_buffer(addr: number, bufr: Buffer) {
        //serial.writeLine("Writing buffer")
        //serial.writeLine("length of bufr = " + bufr.length)
        //serial.writeLine("Bufr = "+bufr.toHex())

        //let canary1 = fram.read8(addr+bufr.length) 
        //let canary2 = fram.read8(addr+(bufr.length*2)+1) 

        let canary = fram.read8(addr + bufr.length)
        //serial.writeLine("Canary: "+canary)
        /*

        if(canary1 == 255){
            canary1 = 1
            canary2 = 0
        } else if(canary2 == 255){
            canary1 = 0
            canary2 = 1
        }
        */

        if (canary == 0) {
            //canary2 is older/they are the same, write to bufr2
            for (let i = 0; i < bufr.length; i++) {
                fram.writeEnable()
                let temp = bufr.getNumber(NumberFormat.UInt8BE, i)
                //serial.writeString("0x"+bufr[i])
                fram.write8(addr + (bufr.length + 1) + i, temp)
            }
            //serial.writeString("In if \n")
            //canary2 = canary1 + 1
            canary = 1
            //serial.writeLine("canary = "+canary)
            //fram.writeEnable()
            //fram.write8(addr+(bufr.length*2)+1, canary2)

            //serial.writeLine(fram.read_buffer(addr+(bufr.length+1), bufr.length).toHex())

            fram.writeEnable()
            fram.write8(addr + bufr.length, canary)
            //serial.writeLine("New canary after write = " + fram.read8(addr+bufr.length))
        } else {
            //canary1 is older, write to bufr1
            for (let i = 0; i < bufr.length; i++) {
                fram.writeEnable()
                let temp = bufr.getNumber(NumberFormat.UInt8BE, i)
                //serial.writeString(""+bufr[i])
                fram.write8(addr + i, temp)
            }
            //serial.writeString(" In else \n")
            //canary1 = canary2 + 1
            canary = 0
            //serial.writeLine("canary1 = "+canary)
            fram.writeEnable()
            fram.write8(addr + bufr.length, canary)
            //fram.writeEnable()
            //fram.write8(addr+(bufr.length*2)+1, canary2)
        }


    }
    //% blockId=fram_read_buffer block="fram|read buffer %addr %len"
    export function read_buffer(addr: number, len: number) {
        serial.writeLine("reading buffer at " + addr + " and length is " + len)
        let bufr = pins.createBuffer(len)
        let canary = fram.read8(addr + len)

        if (canary == 0) {
            for (let i = 0; i < len; i++) {
                bufr.setNumber(NumberFormat.UInt8BE, i, read8(addr + i))
            }
        } else {
            for (let i = 0; i < len; i++) {
                bufr.setNumber(NumberFormat.UInt8BE, i, read8(addr + len + 1 + i))
            }
        }

        serial.writeLine("Read this buffer: " + bufr.toHex())
        return bufr
    }


    //% blockId=fram_getdeviceid block="fram|get device ID"
    export function getDeviceID() {
        let whoami = 0
        let wh0 = 0
        let wh1 = 0
        let wh2 = 0
        let wh3 = 0
        pins.digitalWritePin(DigitalPin.P9, 0)
        whoami = pins.spiWrite(OPCODES.OPCODE_RDID)
        wh0 = pins.spiWrite(255)
        wh1 = pins.spiWrite(255)
        wh2 = pins.spiWrite(255)
        wh3 = pins.spiWrite(255)
        pins.digitalWritePin(DigitalPin.P9, 1)
        //serial.writeString("WHOAMI: " + ("" + whoami) + " wh0:" + ("" + wh0) + " wh1:" + ("" + wh1) + " wh2:" + ("" + wh2) + " wh3:" + ("" + wh3) + "\n")
        if (wh1 == 127) {
            //serial.writeString("FRAM Connected\n")
        } else {
            //serial.writeString("ERR: FRAM not Connected\n")
        }
    }
    //% blockId=fram_writeenable block="fram|write enable"
    export function writeEnable() {
        pins.digitalWritePin(DigitalPin.P9, 0)
        let wh3 = pins.spiWrite(OPCODES.OPCODE_WREN)
        pins.digitalWritePin(DigitalPin.P9, 1)
        //serial.writeLine("FRAM Writes Enabled")
    }
    //% blockId=fram_read8 block="fram|read8 %addr"
    export function read8(addr: number) {
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.spiWrite(OPCODES.OPCODE_READ)
        pins.spiWrite(addr >> 8)
        pins.spiWrite(addr & 0xff)
        let wh3 = pins.spiWrite(255)
        pins.digitalWritePin(DigitalPin.P9, 1)
        return wh3
    }
}