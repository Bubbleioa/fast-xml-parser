const {XMLParser} = require("../src/fxp");

describe("sourceLocation Test with numberParse", function() {
    it("should parse node with currect pos",function(){
        const xml = `<root>
    <!-- 有两种模式：别名和自定义结构 -->
    <!-- 别名 -->
    <UID Type="UINT"/>
    <!-- 自定义结构体 -->   
    <POINT>
        <x Type="UINT"/>
        <y Type="UINT"/>
    </POINT>
    <LINE>
        <p1 Type="POINT"/>
        <p2 Type="POINT"/>
    </LINE>
    <!-- 还能有数组/map -->
    <LINE_LIST Type="array" Element="LINE"/>
    <UID_LINE Type="map" Key="UID" Element="POINT"/>
</root>`;

const expected = `{
    "%_location": "1:2",
    "root": {
        "%_location": "1:2",
        "#comment": [
            " 有两种模式：别名和自定义结构 ",
            " 别名 ",
            " 自定义结构体 ",
            " 还能有数组/map "
        ],
        "UID": {
            "%_location": "4:6",
            "@_Type": "UINT"
        },
        "POINT": {
            "%_location": "6:6",
            "x": {
                "%_location": "7:10",
                "@_Type": "UINT"
            },
            "y": {
                "%_location": "8:10",
                "@_Type": "UINT"
            }
        },
        "LINE": {
            "%_location": "10:6",
            "p1": {
                "%_location": "11:10",
                "@_Type": "POINT"
            },
            "p2": {
                "%_location": "12:10",
                "@_Type": "POINT"
            }
        },
        "LINE_LIST": {
            "%_location": "15:6",
            "@_Type": "array",
            "@_Element": "LINE"
        },
        "UID_LINE": {
            "%_location": "16:6",
            "@_Type": "map",
            "@_Key": "UID",
            "@_Element": "POINT"
        }
    }
}`

    const options = {
        sourceLocationName: "%_location",
        ignoreAttributes: false,
        commentPropName: "#comment"
    };
    const parser = new XMLParser(options);
    let result = parser.parse(xml);
    // console.log(JSON.stringify(result,null,4));
    expect(result).toEqual(JSON.parse(expected));
})});