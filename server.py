#!/usr/bin/env python3
"""
Simple HTTP server for OvinoSul static website
Serves files on port 5000 with cache-control headers to prevent caching issues
"""

import http.server
import socketserver
import os
from functools import partial

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching to ensure updates are visible in Replit's iframe
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging format
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server(port=5000, directory="."):
    os.chdir(directory)
    
    Handler = NoCacheHTTPRequestHandler
    
    # Allow socket reuse to prevent "Address already in use" errors
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("0.0.0.0", port), Handler) as httpd:
        print(f"🐑 OvinoSul server running at http://0.0.0.0:{port}/")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🌐 Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
