/**
 * Ambient light sensor package for microbit Makecode.
 */

    
namespace SGBotic {
    let AMBIENT_I2C_ADDR = 0x4A 
    let AMBIENT_LUX_H = 3
    let AMBIENT_LUX_L = 4
    
    
    /**
     * read register
     */
    function readRegister(reg: number): number {
        pins.i2cWriteNumber(AMBIENT_I2C_ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(AMBIENT_I2C_ADDR, NumberFormat.UInt8BE)
    }
    
    
    
    /**
     * Read ambient light
     */
    //% subcategory=light
    //% blockId="Ambient_getLux" block="lux"
    //% weight=100 blockGap=3 
    export function readLux(): number {
        
        pins.i2cWriteNumber(AMBIENT_I2C_ADDR, AMBIENT_LUX_H, NumberFormat.UInt8BE)
        let readbuf = pins.i2cReadBuffer(AMBIENT_I2C_ADDR, pins.sizeOf(NumberFormat.UInt8LE) * 2)
        
      
        let exponent = (readbuf[0] & 0xF0) >> 4
        let mantissa = ((readbuf[1] & 0x0F)<< 4) | (readbuf[1] & 0xF0)
        let luminance = (2 ** exponent) * mantissa * 45
        luminance = luminance / 1000
        return (luminance)
        
    }
    
    

}