import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colorList, setColorList }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const handleChange = (e) => {
    setColorToEdit({ ...colorToEdit, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post('http://localhost:5000/api/colors', colorToEdit)
      .then((res) => {
        setColorList(res.data);
      });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const newColors = colorList.map((color) => {
          if (color.id === res.data.id) {
            return res.data;
          }
          return color;
        });
        setColorList(newColors);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then((res) => {
        const newColors = colorList.filter((color) => {
          if (color.id === res.data) {
            return false;
          } else {
            return true;
          }
        });
        setColorList(newColors);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='colors-wrap'>
      <form onSubmit={handlePost}>
        <p>add a color</p>
        <input
          type='text'
          name='color'
          placeholder='Color Name'
          value={colorToEdit.color}
          onChange={handleChange}
        />
        <input
          type='text'
          name='code'
          placeholder='Color Hex'
          value={colorToEdit.code.hex}
          onChange={handleChange}
        />
        <button>Add color</button>
      </form>
      <p>colors</p>
      <ul>
        {colorList.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                REMOVE
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
    </div>
  );
};

export default ColorList;
