import React, { useState, useEffect } from 'react';

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ubicación de la cabaña (Cerca de Cartagena)
    const LAT = "10.7032";
    const LON = "-75.3948";

    // Usaremos Open-Meteo que es gratis y no requiere API Key para uso simple
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=America%2FBogota`
                );
                const data = await response.json();
                setWeather(data.current_weather);
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
        // Actualizar cada 30 minutos
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        // WMO Weather interpretation codes
        if (code <= 3) return "bi-sun-fill text-warning"; // Clear / Cloudy
        if (code <= 48) return "bi-cloud-haze2-fill text-muted"; // fog
        if (code <= 67) return "bi-cloud-drizzle-fill text-info"; // rain
        if (code <= 82) return "bi-cloud-rain-heavy-fill text-primary"; // heavy rain
        return "bi-cloud-lightning-rain-fill text-secondary"; // thunder
    };

    if (loading) return <div className="weather-skeleton rounded-pill bg-light animate-pulse" style={{ width: '100px', height: '32px' }}></div>;
    if (!weather) return null;

    return (
        <div className="weather-widget d-flex align-items-center gap-2 bg-white bg-opacity-75 backdrop-blur border border-white border-opacity-50 px-3 py-1 rounded-pill shadow-sm animate-fade-in hover-up transition-all">
            <i className={`bi ${getWeatherIcon(weather.weathercode)} fs-5`}></i>
            <div className="d-flex flex-column lh-1">
                <span className="fw-bold text-dark-blue small">{Math.round(weather.temperature)}°C</span>
                <span className="text-muted" style={{ fontSize: '9px' }}>Cartagena</span>
            </div>

            <style>{`
        .backdrop-blur { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
        </div>
    );
}
