document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    const refreshButton = document.getElementById('refresh-button');
    const downloadButton = document.getElementById('download-button');
    const surpriseImage = document.getElementById('surprise-image');
    
    // 返回主页
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // 刷新页面
    refreshButton.addEventListener('click', () => {
        location.reload();
    });
    
    // 下载图片
    downloadButton.addEventListener('click', () => {
        // 创建一个临时的链接元素来触发下载
        const link = document.createElement('a');
        link.href = surpriseImage.src;
        link.download = '惊喜图片.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // 图片加载失败处理
    surpriseImage.addEventListener('error', () => {
        const imageContainer = document.querySelector('.surprise-image-container');
        imageContainer.innerHTML = `
            <div class="image-error">
                <p>😔 抱歉，图片加载失败！</p>
                <p>请检查图片文件是否存在或路径是否正确。</p>
            </div>
        `;
        downloadButton.disabled = true;
        downloadButton.textContent = '图片不可用';
    });
    
    // 图片加载成功处理
    surpriseImage.addEventListener('load', () => {
        // 可以在这里添加一些加载成功的特效
        console.log('图片加载成功');
    });
});