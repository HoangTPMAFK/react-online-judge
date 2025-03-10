import { useEffect, useState } from "react";
import Submission from "./Submission";
import apiRequest from "../../../api/api";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ProblemDetail({ edit }) {
  const [problem, setProblem] = useState({});
  const [samples, setSamples] = useState({ input: [], output: [] });
  const [hiddenSamples, setHiddenSamples] = useState({ input: [], output: [] });
  const { id } = useParams();

  useEffect(() => {
    apiRequest("problem/" + id, null, "GET")
      .then((response) => {
        setProblem(response.data);
        setSamples(
          response.data.sampleInputOutput
            ? JSON.parse(response.data.sampleInputOutput)
            : { input: [], output: [] }
        );
        setHiddenSamples(
          response.data.hiddenInputOutput
            ? JSON.parse(response.data.hiddenInputOutput)
            : { input: [], output: [] }
        );
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (field, value) => {
    setProblem((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, checked) => {
    setProblem((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSampleChange = (index, type, value, isHidden = false) => {
    if (isHidden) {
      setHiddenSamples((prev) => {
        const updated = { ...prev };
        updated[type][index] = value;
        return updated;
      });
    } else {
      setSamples((prev) => {
        const updated = { ...prev };
        updated[type][index] = value;
        return updated;
      });
    }
  };

  const addRow = () => {
    setSamples((prev) => ({
      input: [...prev.input, ""],
      output: [...prev.output, ""],
    }));
  };

  const addHiddenRow = () => {
    setHiddenSamples((prev) => ({
      input: [...prev.input, ""],
      output: [...prev.output, ""],
    }));
  };

  const removeSampleRow = (index) => {
    setSamples((prev) => ({
      input: prev.input.filter((_, i) => i !== index),
      output: prev.output.filter((_, i) => i !== index),
    }));
  };

  const removeHiddenSampleRow = (index) => {
    setHiddenSamples((prev) => ({
      input: prev.input.filter((_, i) => i !== index),
      output: prev.output.filter((_, i) => i !== index),
    }));
  };

  const editProblem = async (e) => {
    e.preventDefault();
    const requestBody = {
      title: problem.title,
      statement: problem.statement,
      point: problem.point,
      publicFlag: problem.publicFlag,
      timeLimit: problem.timeLimit,
      memoryLimit: problem.memoryLimit,
      difficult: problem.difficult || "",
      input: problem.input,
      output: problem.output,
      sampleInputOutput: JSON.stringify(samples),
      hiddenInputOutput: JSON.stringify(hiddenSamples),
      updateAt: new Date().toISOString(),
    };
    apiRequest(`problem/${id}`, requestBody, "PUT")
      .then(
        response =>
          setProblem(response.data)
      )
      .catch(error => console.error("Update failed:", error))
  };

  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black font-medium pb-6">Problem</h1>
      <form onSubmit={editProblem}>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Title", field: "title", type: "text" },
            { label: "Problem Statement", field: "statement", type: "textarea" },
            { label: "Time limit", field: "timeLimit", type: "number", placeholder: "In milliseconds" },
            { label: "Memory limit", field: "memoryLimit", type: "number", placeholder: "In KBs" },
            { label: "Input", field: "input", type: "textarea" },
            { label: "Output", field: "output", type: "textarea" },
            { label: "Points", field: "point", type: "number" },
          ].map(({ label, field, type, placeholder }, index) => (
            <div key={index} className="flex flex-row justify-between mb-4">
              <div className="text-xl">{label}</div>
              {type === "textarea" ? (
                <textarea
                  className="w-60 h-20 px-1 border"
                  value={problem[field] || ""}
                  readOnly={!edit}
                  placeholder={placeholder || ""}
                  onChange={(e) => edit && handleChange(field, e.target.value)}
                />
              ) : (
                <input
                  type={type}
                  className="w-60 pl-2 h-8 border"
                  value={problem[field] || ""}
                  readOnly={!edit}
                  placeholder={placeholder || ""}
                  onChange={(e) => edit && handleChange(field, e.target.value)}
                />
              )}
            </div>
          ))}
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Public</div>
            <input
              className="border w-4"
              type="checkbox"
              checked={problem.publicFlag || false}
              readOnly={!edit}
              onChange={(e) => edit && handleCheckboxChange("publicFlag", e.target.checked)}
            />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Level</div>
            <select
              className="w-44 border"
              value={problem.difficult || ""}
              disabled={!edit}
              onChange={(e) => edit && handleChange("difficult", e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Sample Input & Output Section */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 border-b pb-2">
            <div className="text-lg font-medium">Sample Input</div>
            <div className="text-lg font-medium">Sample Output</div>
          </div>
          {samples.input.map((input, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <textarea
                className="flex-1 h-16 p-2 border rounded"
                value={input}
                readOnly={!edit}
                onChange={(e) => edit && handleSampleChange(index, "input", e.target.value)}
              />
              <textarea
                className="flex-1 h-16 p-2 border rounded"
                value={samples.output[index] || ""}
                readOnly={!edit}
                onChange={(e) => edit && handleSampleChange(index, "output", e.target.value)}
              />
              {edit && (
                <button
                  type="button"
                  className="w-20 bg-red-500 text-white rounded"
                  onClick={() => removeSampleRow(index)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {edit && (
            <button
              type="button"
              onClick={addRow}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add Sample
            </button>
          )}
        </div>

        {/* Hidden Input & Output Section */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 border-b pb-2">
            <div className="text-lg font-medium">Hidden Input</div>
            <div className="text-lg font-medium">Hidden Output</div>
          </div>
          {hiddenSamples.input.map((input, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <textarea
                className="flex-1 h-16 p-2 border rounded"
                value={input}
                readOnly={!edit}
                onChange={(e) => edit && handleSampleChange(index, "input", e.target.value, true)}
              />
              <textarea
                className="flex-1 h-16 p-2 border rounded"
                value={hiddenSamples.output[index] || ""}
                readOnly={!edit}
                onChange={(e) => edit && handleSampleChange(index, "output", e.target.value, true)}
              />
              {edit && (
                <button
                  type="button"
                  className="w-20 bg-red-500 text-white rounded"
                  onClick={() => removeHiddenSampleRow(index)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {edit && (
            <button
              type="button"
              onClick={addHiddenRow}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add Hidden
            </button>
          )}
        </div>

        <div className="mt-4">
          <Submission />
        </div>

        {edit && (
          <button type="submit" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edit
          </button>
        )}
      </form>
    </main>
  );
}

ProblemDetail.defaultProps = {
  edit: false,
};

ProblemDetail.propTypes = {
  edit: PropTypes.bool,
};

export default ProblemDetail;
