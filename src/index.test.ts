import { testFunction } from ".";

test ('testFunction.name', () => {

    expect(testFunction('world')).toEqual('hello world')

})