<template>
   <div class="popup bg-white p-4 rounded shadow-md">
    <p class="text-gray-800">Вы уверены, что хотите удалить эту сущность?</p>
    <button @click="$emit('confirm')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Да</button>
    <button @click="$emit('cancel')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Нет</button>
</div>
  </template>
  
  <script>
  export default {

  };
  </script>
  
  <style>
  </style>