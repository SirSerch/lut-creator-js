import {Hald} from "../Hald";

describe('Lut Creator', () => {
    describe('Create Hal should generate a png file', () => {
        it('should create a HAL png file with canvas size zero if LUT size is zero', () => {
            const canvasZero = document.createElement('canvas');
            canvasZero.width = 0;
            canvasZero.height = 0;
            const hald = new Hald(0);
            const spyExportHald = jest.spyOn(hald as any,'exportHald')

            expect(() => hald.createHald(0)).not.toThrowError();
            expect(spyExportHald).toHaveBeenCalledWith(canvasZero, 0);
        });

        it('should create the png file if lut size is not zero', () => {
            const hald = new Hald(20);

            expect(() => hald.createHald(20)).not.toThrowError();
        });
    });
});
