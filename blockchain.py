import hashlib
import datetime

# 定义区块类
class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = 0
        self.hash = self.hash_block()

    def hash_block(self):
        sha = hashlib.sha256()
        sha.update(str(self.index).encode('utf-8') +
                   str(self.timestamp).encode('utf-8') +
                   str(self.data).encode('utf-8') +
                   str(self.previous_hash).encode('utf-8') +
                   str(self.nonce).encode('utf-8'))
        return sha.hexdigest()

    def mine_block(self, difficulty):
        target = '0' * difficulty
        while self.hash[:difficulty] != target:
            self.nonce += 1
            self.hash = self.hash_block()

# 定义区块链类
class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        # 创建创世区块
        return Block(0, datetime.datetime.now(), "Genesis Block", "0")

    def get_last_block(self):
        return self.chain[-1]

    def add_block(self, data, difficulty=2):
        last_block = self.get_last_block()
        new_block = Block(last_block.index + 1, datetime.datetime.now(), data, last_block.hash)
        new_block.mine_block(difficulty)
        self.chain.append(new_block)

# 创建区块链并添加一些区块
blockchain = Blockchain()

blockchain.add_block("First Block after Genesis")
blockchain.add_block("Second Block after Genesis")
blockchain.add_block("Third Block after Genesis")

# 打印区块链中的所有区块
for block in blockchain.chain:
    print(f"Index: {block.index}")
    print(f"Timestamp: {block.timestamp}")
    print(f"Data: {block.data}")
    print(f"Hash: {block.hash}")
    print(f"Previous Hash: {block.previous_hash}")
    print(f"Nonce: {block.nonce}")
    print("-" * 30)
