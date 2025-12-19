document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    const refreshButton = document.getElementById('refresh-button');
    const downloadButton = document.getElementById('download-button');
    const surpriseImage = document.getElementById('surprise-image');
    
    // 图片数组
    const images = [
        { 
            src: 'a97225dab86d497c70b4c8c70327bda6.jpeg', 
            name: '惊喜图片.jpeg',
            alt: '惊喜图片 - JPEG'
        },
        { 
            src: 'cf608352aee3452aa6beabbc87f77f84.png', 
            name: '惊喜图片.png',
            alt: '惊喜图片 - PNG'
        }
    ];
    
    // 当前显示的图片索引
    let currentImageIndex = 0;
    
    // 返回主页
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // 切换图片
    refreshButton.addEventListener('click', () => {
        // 切换到下一张图片
        currentImageIndex = (currentImageIndex + 1) % images.length;
        
        // 更新图片源
        surpriseImage.src = images[currentImageIndex].src;
        surpriseImage.alt = images[currentImageIndex].alt;
        
        // 添加切换动画效果
        surpriseImage.style.opacity = '0';
        setTimeout(() => {
            surpriseImage.style.opacity = '1';
        }, 300);
        
        // 更新下载按钮的文件名
        downloadButton.onclick = () => downloadImage(images[currentImageIndex].name);
        
        // 显示切换提示
        showSwitchMessage();
    });
    
    // 下载图片
    function downloadImage(fileName) {
        // 创建一个临时的链接元素来触发下载
        const link = document.createElement('a');
        link.href = surpriseImage.src;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // 初始设置下载按钮
    downloadButton.onclick = () => downloadImage(images[currentImageIndex].name);
    
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
    
    // 显示切换提示
    function showSwitchMessage() {
        // 创建提示消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = 'switch-message';
        messageDiv.textContent = `已切换到 ${images[currentImageIndex].alt}`;
        document.body.appendChild(messageDiv);
        
        // 2秒后自动移除消息
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 2000);
    }
});