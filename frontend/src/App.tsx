import { Component, createSignal, For, onMount } from 'solid-js';

const App: Component = () => {
  const [weatherForecasts, setWeatherForecasts] = createSignal([]);

  onMount(async () => {
    const res = await fetch(
      `http://host.docker.internal:5021/weather-forecast`
    );

    setWeatherForecasts(await res.json());
  });
  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">
        Hello tailwindcss!!!
      </p>
      <For each={weatherForecasts()} fallback={<p>Loading...</p>}>
        {(wf) => <p>{wf.temperatureC}</p>}
      </For>
    </>
  );
};

export default App;
