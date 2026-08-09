package com.surveillance;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.Executors;

public class SmartRiverServer {

    private static final int PORT = 8080;
    private static final String FRONTEND_DIR = "../frontend";

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println("   SMART RIVER WATER LEVEL AND QUALITY SURVEILLANCE - JAVA FULL STACK SERVER");
        System.out.println("==========================================================================");

        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // Register API Routes
        server.createContext("/api/live-data", new LiveDataHandler());

        // Register Static Frontend Routes
        server.createContext("/", new StaticFileHandler(FRONTEND_DIR));

        // Use multi-threaded virtual thread executor for high performance concurrency
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
        server.start();

        System.out.println("🚀 Enterprise Java Server running live at: http://localhost:" + PORT);
        System.out.println("🌐 Public Dashboard: http://localhost:" + PORT + "/index.html");
        System.out.println("🔗 Admin Control Panel: http://localhost:" + PORT + "/admin.html");
        System.out.println("==========================================================================");
    }

    // --- CPCB Proxy Handler (Live API Proxy) ---
    static class LiveDataHandler implements HttpHandler {
        private final HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
                exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");

                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                long timestamp = System.currentTimeMillis();
                String cpcbUrl = "https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=" + timestamp;

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(cpcbUrl))
                        .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                        .header("Cache-Control", "no-cache, no-store, must-revalidate")
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                byte[] responseBytes = response.body().getBytes("UTF-8");
                exchange.sendResponseHeaders(200, responseBytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(responseBytes);
                }
            } catch (Exception e) {
                System.err.println("[Java Backend Error] CPCB Fetch Failed: " + e.getMessage());
                String fallbackJson = "[]";
                byte[] fallbackBytes = fallbackJson.getBytes("UTF-8");
                exchange.sendResponseHeaders(503, fallbackBytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(fallbackBytes);
                }
            }
        }
    }

    // --- Static File Handler (Serves frontend assets) ---
    static class StaticFileHandler implements HttpHandler {
        private final String baseDir;

        public StaticFileHandler(String baseDir) {
            this.baseDir = baseDir;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                String path = exchange.getRequestURI().getPath();
                if ("/".equals(path) || path.isEmpty()) {
                    path = "/index.html";
                }

                File file = new File(baseDir, path);
                if (!file.exists() || file.isDirectory()) {
                    file = new File(baseDir, "index.html");
                }

                if (!file.exists()) {
                    String notFoundStr = "404 File Not Found";
                    exchange.sendResponseHeaders(404, notFoundStr.length());
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(notFoundStr.getBytes());
                    }
                    return;
                }

                String contentType = getMimeType(file.getName());
                exchange.getResponseHeaders().set("Content-Type", contentType);

                byte[] bytes = new byte[(int) file.length()];
                try (FileInputStream fis = new FileInputStream(file)) {
                    fis.read(bytes);
                }

                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }
            } catch (Exception e) {
                System.err.println("[Static File Error]: " + e.getMessage());
            }
        }

        private String getMimeType(String fileName) {
            if (fileName.endsWith(".html")) return "text/html; charset=UTF-8";
            if (fileName.endsWith(".css")) return "text/css; charset=UTF-8";
            if (fileName.endsWith(".js")) return "application/javascript; charset=UTF-8";
            if (fileName.endsWith(".json")) return "application/json; charset=UTF-8";
            if (fileName.endsWith(".png")) return "image/png";
            if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) return "image/jpeg";
            if (fileName.endsWith(".ico")) return "image/x-icon";
            return "text/plain; charset=UTF-8";
        }
    }
}
