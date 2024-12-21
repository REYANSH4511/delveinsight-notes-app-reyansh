const getMessage = require("../message");
const responseHandler = require("../utils/responseHandler");
const Notes = require("./model");

exports.createNotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, content, tags } = req.body;

    if (!title || !content || !tags) {
      return responseHandler({
        res,
        statusCode: 400,
        status: "error",
        message: getMessage("M001"),
      });
    }

    const note = await Notes.create({ title, content, tags, userId: _id });
    return responseHandler({
      res,
      statusCode: 200,
      status: "success",
      message: getMessage("M003"),
      data: note,
    });
  } catch (err) {
    return responseHandler({
      res,
      statusCode: 400,
      status: "error",
      message: err.message,
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, tags, content } = req.query;
    const filter = { userId: _id };
    if (title) {
      filter.title = title;
    }
    if (tags) {
      filter.tags = tags;
    }
    if (content) {
      filter.content = content;
    }
    const notes = await Notes.find(filter);

    if (notes?.length === 0) {
      return responseHandler({
        res,
        statusCode: 400,
        status: "error",
        message: getMessage("M005"),
      });
    }

    return responseHandler({
      res,
      statusCode: 200,
      status: "success",
      message: getMessage("M004"),
      data: notes,
    });
  } catch (err) {
    return responseHandler({
      res,
      statusCode: 400,
      status: "error",
      message: err.message,
    });
  }
};

exports.getNotesDetails = async (req, res) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;
    const note = await Notes.findById({ _id: noteId, userId: _id });
    if (!note) {
      return responseHandler({
        res,
        statusCode: 400,
        status: "error",
        message: getMessage("M005"),
      });
    }
    return responseHandler({
      res,
      statusCode: 200,
      status: "success",
      message: getMessage("M004"),
      data: note,
    });
  } catch (err) {
    return responseHandler({
      res,
      statusCode: 400,
      status: "error",
      message: err.message,
    });
  }
};
