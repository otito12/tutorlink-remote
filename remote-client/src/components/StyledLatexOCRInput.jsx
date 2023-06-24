import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { Grid, TextField, Button, Typography, IconButton } from "@mui/material";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { EditableMathField, StaticMathField } from "react-mathquill";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StyledLatexOCRInput() {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const [messages, setMessages] = useState([]);
  const [current_message, set_current_message] = useState("Test from client");
  const [socket, setSocket] = useState();
  const [stepsState, setStepsState] = useState({});
  const [stepsCachedState, setStepsCachedState] = useState({});

  useEffect(() => {
    setSocket(io("http://localhost:3500"));
  }, []);

  socket?.on("connect", () => {
    console.log("Connected from the client");
  });

  socket?.on("recieve-message", (message) => {
    console.log(message);
    setMessages([...messages, message]);
    const len = Object.keys(stepsState).length;
    setStepsState((stepsState) => ({
      ...stepsState,
      [len]: { message: message, edit: false },
    }));
    setStepsCachedState((stepsCachedState) => ({
      ...stepsCachedState,
      [len]: { message: message, edit: false },
    }));
    console.log(stepsState);
  });

  const handleMessageSend = (event) => {
    event.preventDefault();
    const uri = stageRef.current.toDataURL();
    let message = {
      id: uuidv4(),
      from: socket.id,
      sent: Date.now(),
      message: uri,
    };
    socket.emit("send-message", message);
    console.log("message sent:\n", message);
    stageRef.current.clear();
    setLines([]);
    console.log(uri);
  };

  const handleEditButton = (key) => {
    setStepsState((stepsState) => ({
      ...stepsState,
      [key]: {
        message: stepsState[key]["message"],
        edit: true,
      },
    }));
  };

  const handleCancelButton = (key) => {
    setStepsState((stepsState) => ({
      ...stepsState,
      [key]: {
        message: stepsState[key]["message"],
        edit: false,
      },
    }));
    setStepsCachedState((stepsCachedState) => ({
      ...stepsCachedState,
      [key]: {
        message: stepsState[key]["message"],
        edit: false,
      },
    }));
  };

  const handleSaveEditButton = (key) => {
    setStepsState((stepsState) => ({
      ...stepsState,
      [key]: {
        message: stepsCachedState[key]["message"],
        edit: false,
      },
    }));
  };

  const handleStepEdit = (key, mathField) => {
    setStepsCachedState((stepsState) => ({
      ...stepsCachedState,
      [key]: {
        message: mathField.latex(),
        edit: !stepsCachedState[key]["edit"],
      },
    }));
  };

  const handleDeleteStepButton = (key) => {
    setStepsState((current) => {
      // 👇️ remove the salary key from an object
      const copy = { ...current };
      delete copy[key];
      return copy;
    });
    setStepsCachedState((current) => {
      // 👇️ remove the salary key from an object
      const copy = { ...current };
      delete copy[key];
      return copy;
    });
  };

  return (
    <Grid container p={1}>
      {Object.keys(stepsState).map((key) => (
        <Grid
          key={key}
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%", p: 1 }}
        >
          {stepsState[key]["edit"] ? (
            <>
              <EditableMathField
                latex={stepsState[key]["message"]}
                onChange={(mathField) => {
                  handleStepEdit(key, mathField);
                }}
              />
              <Grid item>
                <IconButton onClick={() => handleSaveEditButton(key)}>
                  <CheckIcon sx={{ color: "#5cb85c" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleCancelButton(key)}
                  sx={{ color: "#cf142b" }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </>
          ) : (
            <>
              <InlineMath math={stepsState[key]["message"]} />
              <Grid item>
                <IconButton onClick={() => handleEditButton(key)}>
                  <EditIcon sx={{ color: "#4287f" }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteStepButton(key)}>
                  <DeleteIcon sx={{ color: "#cf142b" }} />
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
      ))}
      <Grid
        container
        mt={2}
        p={2}
        sx={{ border: "1px solid #e9e9e9", borderRadius: "8px" }}
      >
        <Stage
          width={window.innerWidth}
          height={"200"}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
      </Grid>
      <Grid container justifyContent={"end"} pt={1}>
        <Button onClick={(e) => handleMessageSend(e)}>Process text</Button>
      </Grid>
    </Grid>
  );
}
