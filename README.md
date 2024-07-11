Create an index.html file to test the bundle:


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web3Modal Test</title>
</head>
<body>
    <button id="connect">Connect Wallet</button>
    <script src="./dist/web3modal.bundle.js"></script>
</body>
</html>


Run Webpack to bundle your JavaScript:

npx webpack


Serve the HTML File Locally

Install http-server globally if you haven't already:

npm install -g http-server

Run the local server in your project directory:

http-server

Open your browser and navigate to the provided local server URL (e.g., http://localhost:8080).




TO Run this in PHP
Create the Plugin Directory:
Create a new folder for your plugin in the wp-content/plugins directory of your WordPress installation, e.g., web3modal-plugin.

Create the PHP Plugin File
Create the web3modal-plugin.php file with the following content:


<?php
/*
Plugin Name: Web3Modal Plugin
Description: A plugin to integrate Web3Modal with WalletConnect in WordPress.
Version: 1.0
Author: Your Name
*/

function web3modal_enqueue_scripts() {
    wp_enqueue_script('web3modal-bundle', plugins_url('/dist/web3modal.bundle.js', __FILE__), array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'web3modal_enqueue_scripts');

function web3modal_add_button() {
    echo '<button id="connect">Connect Wallet</button>';
}
add_action('wp_footer', 'web3modal_add_button');


