document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    
    document.getElementById('level1').addEventListener('click', function () {
        window.location.href = 'level1.html';
        
    });

    document.getElementById('level2').addEventListener('click', function () {
        window.location.href = 'level2.html';
    });

    document.getElementById('level3').addEventListener('click', function () {
        window.location.href = 'level3.html';
    });
});
