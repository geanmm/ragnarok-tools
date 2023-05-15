"use client";
import Input from "@/components/inputProps";
import { useState } from "react";
import { mobLabelList } from "../components/labels";
import React from "react";

export default function Home() {
  const [textInput, setTextInput] = useState<any>([]);
  const [currentLine, setCurrentLine] = useState<any>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [mobDataType, setMobDataType] = useState(1);

  const [filter, setFilter] = useState<any>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  function textImport(e: any) {
    const input = e?.target;
    const reader = new FileReader();

    reader.onload = function () {
      const result: any = reader?.result?.toString().split("\n");
      const array = result?.filter((e: any) => e != "\r" && e != "");

      const itemData = array[9]?.replaceAll("/", "").split(",");

      if (itemData.length != 58) {
        alert("Invalid Mob_db.txt lines!");
        return;
      }

      setTextInput(array);
      setIsChanged(false);
    };
    reader.readAsText(input.files[0], "ISO-8859-1");
  }

  function downloadDBTxt(content: Array<String>) {
    const arr = content.join("\r");
    const link = document.createElement("a");

    const file = new Blob([arr], { type: "text/plain" });

    link.href = URL.createObjectURL(file);

    link.download = "mob_db.txt";

    link.click();
    URL.revokeObjectURL(link.href);

    setIsChanged(false);
  }

  function selectLine(item: string, index: number) {
    const itemData = item.replaceAll("/", "").split(",");

    if (isNaN(parseInt(itemData[0]))) {
      setCurrentLine([]);
      setCurrentLineIndex(null);
      return;
    }
    setCurrentLine(itemData);
    setCurrentLineIndex(index);
  }

  function inputHandleChange(value: string, index: any) {
    const tmpItem = [...currentLine];

    tmpItem[index] = value;

    setCurrentLine(tmpItem);
  }

  function saveChanges() {
    if (currentLineIndex == null) return;
    const tmp = [...textInput];

    tmp[currentLineIndex] = currentLine.join(",");

    setTextInput(tmp);
    setCurrentLine([]);
    setCurrentLineIndex(null);
    setIsFiltered(false);

    alert("Mob changed");
    !isChanged && setIsChanged(true);
  }

  function addNewMob() {
    if (currentLine.length === 0) return;

    const newMobID = currentLine[0];
    let mobExists = false;

    textInput.find((item: string) => {
      const id = item.split(",")[0];

      if (newMobID === id) {
        mobExists = true;
      }
    });

    if (mobExists) {
      alert("You cant add a new mob with an already used ID!");
      return;
    }

    let newMobData = [...currentLine.map((item: string) => item ?? "")];

    const blankSpaces = 58 - currentLine.length;

    for (let i = 0; i < blankSpaces; i++) {
      newMobData.push("");
    }

    const tmp = [...textInput];
    const newMob = newMobData.join(",");

    tmp.push(newMob);

    setTextInput(tmp);
    setIsFiltered(false);
    alert("Mob added at the end of the db!");

    setCurrentLine([]);
    setCurrentLineIndex(null);

    !isChanged && setIsChanged(true);
  }

  function removeMob() {
    if (currentLineIndex === null) return;

    const tmp = [...textInput];
    tmp.splice(currentLineIndex, 1);

    setTextInput(tmp);

    setCurrentLine([]);
    setCurrentLineIndex(null);

    setIsFiltered(false);
    alert("Mob removed from the db!");

    !isChanged && setIsChanged(true);
  }

  function filterMob(value: string) {
    if (!value) {
      setIsFiltered(false);
      return;
    }

    const filteredArr = textInput.filter((val: any) => {
      return val.toLowerCase().includes(value.toLowerCase());
    });
    setFilter(filteredArr);
    setIsFiltered(true);
  }

  function clearFields() {
    setCurrentLine([]);
    setCurrentLineIndex(null);
  }

  return (
    <main className="w-full flex flex-col gap-4 items-center text-white text-sm relative py-10">
      <h1 className="font-pixel sm:text-3xl 2xl:text-4xl text-5xl text-white drop-shadow-[0.2rem_0.2rem_#2e2649]">
        Mob_db.txt
      </h1>

      {isChanged && (
        <button
          className="font-pixel flex h-10 justify-center my-2 items-center px-3 bg-pixel-orange cursor-pointer hover:bg-pixel-orange/70 xl:text-[12px] sm:text-[8px] drop-shadow-[0.2rem_0.2rem_#2e2649]"
          onClick={() => downloadDBTxt(textInput)}
        >
          DOWNLOAD NEW .TXT
        </button>
      )}

      <div className="flex xl:flex-col items-center sm:justify-normal xl:justify-normal justify-center gap-10 2xl:gap-5 w-full h-full">
        <section
          id="currentTable"
          className="w-[1000px] xl:w-[80vw] 2xl:w-[700px] 2xl:h-[450px] h-[680px] sm:min-h-[400px] xl:min-h-[400px] bg-pixel-orange pt-3 pb-1"
        >
          <div className="bg-pixel-grey h-full w-full overflow-hidden p-4">
            <div
              id="itemsMenuTxt"
              className="flex items-center border-b-2 pb-2 border-b-pixel-orange"
            >
              <label
                htmlFor="textFile"
                className="font-pixel flex h-10 justify-center items-center px-3 bg-pixel-orange cursor-pointer hover:bg-pixel-orange/70 xl:text-[12px] sm:text-[8px]"
              >
                SELECT
              </label>
              <input
                className="hidden"
                type="file"
                name="file"
                id="textFile"
                onChange={(e) => textImport(e)}
              />
              <input
                type="text"
                name="filter"
                id="filter"
                placeholder="MOB SEARCH"
                onChange={(e) => filterMob(e.target.value)}
                className="h-10 border-none ml-auto w-96 focus:outline-none text-black p-3 sm:w-[60%]"
              />
            </div>
            <div
              id="itemList"
              className="h-[90%] w-full overflow-x-hidden block mt-4"
            >
              {isFiltered
                ? filter.map((item: string, index: number) => (
                    <li
                      key={`linha-${index}`}
                      style={
                        currentLineIndex === index
                          ? { backgroundColor: "#eb836a" }
                          : {}
                      }
                      onClick={() => selectLine(item, index)}
                      className="cursor-pointer hover:bg-zinc-600 whitespace-nowrap list-none"
                    >
                      {item}
                    </li>
                  ))
                : textInput.map((item: string, index: number) => (
                    <li
                      key={`linha-${index}`}
                      style={
                        currentLineIndex === index
                          ? { backgroundColor: "#eb836a" }
                          : {}
                      }
                      onClick={() => {
                        selectLine(item, index);
                      }}
                      className="cursor-pointer hover:bg-zinc-600 whitespace-nowrap list-none"
                    >
                      {item}
                    </li>
                  ))}
            </div>
          </div>
        </section>

        <section
          id="editTable"
          className="w-[670px] xl:w-[80vw] 2xl:w-[470px] 2xl:h-[450px] h-[680px] xl:min-h-[400px] text-sm text-white  bg-pixel-orange pt-3 pb-1"
        >
          <div className="bg-pixel-grey w-full h-full p-4 overflow-hidden">
            <div className="w-full flex items-center justify-end gap-3 mb-2 sm:mb-6">
              <button
                className="w-20 h-10 font-pixel bg-pixel-orange hover:bg-pixel-orange/70 xl:text-[12px] sm:text-[8px]"
                onClick={() => clearFields()}
              >
                CLEAR
              </button>
              <button
                className="w-[80px] h-10 font-pixel bg-pixel-orange  hover:bg-pixel-orange/70 xl:text-[12px] sm:text-[8px]"
                onClick={() => addNewMob()}
              >
                ADD
              </button>
              <button
                className="w-[80px] h-10 font-pixel bg-pixel-orange  hover:bg-pixel-orange/70 xl:text-[12px] sm:text-[8px]"
                onClick={() => removeMob()}
              >
                DEL
              </button>
              <button
                className="w-[80px] h-10 font-pixel bg-pixel-orange  hover:bg-pixel-orange/70 xl:text-[12px] sm:text-[8px]"
                onClick={() => saveChanges()}
              >
                EDIT
              </button>
            </div>

            <div className="h-[90%] w-full overflow-x-hidden flex flex-col">
              <h3
                className="mb-4 pb-2 w-auto text-lg border-b-2 border-pixel-orange font-pixel cursor-pointer"
                onClick={() =>
                  mobDataType === 1 ? setMobDataType(0) : setMobDataType(1)
                }
              >
                Primary Stats
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_max-content))] gap-x-2">
                {mobLabelList.map((item: string, index: number) => (
                  <React.Fragment key={`mobPrimaryStats-${index}`}>
                    {index <= 19 && (
                      <span
                        style={
                          mobDataType === 1
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <Input
                          name={`input-n-${index}`}
                          value={currentLine[index]}
                          label={item}
                          handleChange={(value) =>
                            inputHandleChange(value, index)
                          }
                        />
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <h3
                className="my-4 pb-2 w-auto text-lg border-b-2 border-pixel-orange font-pixel cursor-pointer"
                onClick={() =>
                  mobDataType === 2 ? setMobDataType(0) : setMobDataType(2)
                }
              >
                Secondary Stats
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_max-content))] ">
                {mobLabelList.map((item: string, index: number) => (
                  <React.Fragment key={`mobPrimaryStats-${index}`}>
                    {index > 19 && index <= 37 && (
                      <span
                        style={
                          mobDataType === 2
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <Input
                          name={`input-n-${index}`}
                          value={currentLine[index]}
                          label={item}
                          handleChange={(value) =>
                            inputHandleChange(value, index)
                          }
                        />
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <h3
                className="my-4 pb-2 w-auto text-lg border-b-2 border-pixel-orange font-pixel cursor-pointer"
                onClick={() =>
                  mobDataType === 3 ? setMobDataType(0) : setMobDataType(3)
                }
              >
                Drops
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_max-content))] gap-x-2">
                {mobLabelList.map((item: string, index: number) => (
                  <React.Fragment key={`mobPrimaryStats-${index}`}>
                    {index > 37 && (
                      <span
                        style={
                          mobDataType === 3
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <Input
                          name={`input-n-${index}`}
                          value={currentLine[index]}
                          label={item}
                          handleChange={(value) =>
                            inputHandleChange(value, index)
                          }
                        />
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
