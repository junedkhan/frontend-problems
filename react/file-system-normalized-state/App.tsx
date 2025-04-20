import React, { useState, useMemo, useRef, useCallback } from "react";
import "./styles.css";

const initialState = {
  items: {
    byIds: {
      1: { id: 1, name: "file 1", type: "file", root: true },
      2: {
        id: 2,
        name: "folder 1",
        type: "folder",
        descendents: [3, 4],
        root: true,
      },
      3: {
        id: 3,
        name: "folder 3",
        type: "folder",
        descendents: [],
        parentId: 2,
      },
      4: { id: 4, name: "file 4", type: "file", parentId: 2 },
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT": {
      const { id, name } = action.payload;
      const item = state.items.byIds[id];
      return item
        ? {
            ...state,
            items: {
              byIds: {
                ...state.items.byIds,
                [id]: { ...item, name },
              },
            },
          }
        : state;
    }
    case "DELETE": {
      const { id } = action.payload;
      const item = state.items.byIds[id];

      if (!item) return state;

      const parentId = item.parentId;
      const updatedItems = { ...state.items };
      updatedItems.byIds = { ...updatedItems.byIds };
      delete updatedItems.byIds[id];
      if (parentId) {
        updatedItems.byIds[parentId].descendents = updatedItems.byIds[
          parentId
        ].descendents.filter((childId) => childId !== id);
      }

      return { ...state, items: updatedItems };
    }
    case "ADD": {
      const { item, parentId } = action.payload;
      const id = Date.now();
      item.id = id;
      item.parentId = parentId;

      const updatedItems = {
        ...state.items,
        byIds: { ...state.items.byIds, [id]: item },
      };
      if (parentId) {
        updatedItems.byIds[parentId] = {
          ...updatedItems.byIds[parentId],
          descendents: [
            ...(updatedItems.byIds[parentId]?.descendents ?? []),
            id,
          ],
        };
      }

      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
};

const FileSysytemContext = React.createContext(null);

const FileSystemContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const rootElements = useMemo(
    () =>
      Object.keys(state.items.byIds).filter((id) => state.items.byIds[id].root),
    [state.items]
  );
  const stateByIds = useMemo(() => state.items.byIds, [state.items]);

  const editName = useCallback(
    (id, name) => dispatch({ type: "EDIT", payload: { id, name } }),
    []
  );
  const addItem = useCallback(
    (parentId, item) => dispatch({ type: "ADD", payload: { parentId, item } }),
    []
  );
  const deleteItem = useCallback(
    (id) => dispatch({ type: "DELETE", payload: { id } }),
    []
  );

  const value = { rootElements, stateByIds, editName, addItem, deleteItem };
  return (
    <FileSysytemContext.Provider value={value}>
      {children}
    </FileSysytemContext.Provider>
  );
};

const useFileSystemContext = () => {
  const context = React.useContext(FileSysytemContext);
  if (!context)
    throw new Error("Please use this under FileSystemContextProvider");
  return context;
};

const Controls = ({
  hideEdit,
  hideDelete,
  hideAdd,
  hideControls,
  onClickEdit,
  onClickAddFile,
  onClickAddFolder,
  onClickDelete,
}) => (
  <div className={`controls-container ${hideControls ? "hide-controls" : ""}`}>
    {!hideEdit && <button onClick={onClickEdit}>E</button>}
    {!hideAdd && <button onClick={onClickAddFile}>Fi</button>}
    {!hideAdd && <button onClick={onClickAddFolder}>Fo</button>}
    {!hideDelete && <button onClick={onClickDelete}>D</button>}
  </div>
);

const Item = ({ id }) => {
  const { stateByIds, editName, addItem, deleteItem } = useFileSystemContext();
  const { name, type, descendents, root } = stateByIds[id];

  const [isEditable, setIsEditable] = useState(false);
  const [filename, setFileName] = useState(name);

  const fileInputRef = useRef();

  const isFile = type === "file";
  const icon = isFile ? "📄" : "📁";
  const hideAdd = isFile;
  const hasChildren = descendents?.length > 0;

  const onChangeFileName = (event) =>
    setFileName(event.target.value.trim() || filename);
  const onClickEdit = () => {
    setIsEditable(true);
    setTimeout(() => fileInputRef.current?.focus(), 0);
  };
  const onBlur = () => {
    setIsEditable(false);
    editName(id, filename);
  };
  // When adding a new file or folder to this item, ensure it's passed the correct parentId
  const onAddFileItemClick = () => {
    const item = { type: "file", name: "New file", root: false };
    addItem(id, item); // Pass the current folder's id as the parentId
  };

  const onClickAddFolder = () => {
    const item = { type: "folder", name: "New folder", root: false };
    addItem(id, item); // Pass the current folder's id as the parentId
  };
  const onDeleteItem = () => deleteItem(id);

  return (
    <div>
      <div className="item-container">
        <div className="item-type">
          <div className="item-icon">{icon}</div>
          {isEditable ? (
            <input
              type="text"
              ref={fileInputRef}
              value={filename}
              onChange={onChangeFileName}
              onBlur={onBlur}
            />
          ) : (
            <div className="item-name">{name}</div>
          )}
        </div>
        <Controls
          hideDelete={false}
          hideAdd={hideAdd}
          hideControls
          onClickEdit={onClickEdit}
          onClickAddFile={onAddFileItemClick}
          onClickAddFolder={onClickAddFolder}
          onClickDelete={onDeleteItem}
        />
      </div>
      {hasChildren && (
        <div className="children-items">
          {descendents.map((item) => (
            <Item key={item} id={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileSystem = () => {
  const { rootElements, addItem } = useFileSystemContext();
  const [isOpen, setIsOpen] = useState(true);

  const onClickHeader = () => setIsOpen((prev) => !prev);
  const onAddFileItemClick = () => {
    const item = { type: "file", name: "New file", root: true };
    addItem(undefined, item); // For root items, parentId is undefined
  };

  const onClickAddFolder = () => {
    const item = { type: "folder", name: "New folder", root: true };
    addItem(undefined, item); // For root items, parentId is undefined
  };

  return (
    <div className="file-system-container">
      <div className="file-system-header">
        <div className="header" onClick={onClickHeader}>
          Files
        </div>
        <Controls
          hideDelete
          hideEdit
          onClickAddFile={onAddFileItemClick}
          onClickAddFolder={onClickAddFolder}
        />
      </div>
      {isOpen && (
        <div className="items-container">
          {rootElements.map((item) => (
            <Item key={item} id={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <FileSystemContextProvider>
      <FileSystem />
    </FileSystemContextProvider>
  );
}
