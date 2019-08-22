const urltoFile = async (url, filename, mimeType) => {
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([ buf ], filename, { type: mimeType });
  } catch (e) {
    console.log(e);
  }
};

export default urltoFile;
