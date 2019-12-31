module.exports = ({_response}, text) => {
    expect(_response.statusText).toEqual(text);
}
