import os
import sys

def scan_directory(output_file):
    # 获取当前脚本所在目录
    base_dir = os.path.dirname(os.path.abspath(__file__))

    with open(output_file, 'w', encoding='utf-8') as f_out:
        # 写入目录结构
        f_out.write("=== 目录结构 ===\n")
        for root, dirs, files in os.walk(base_dir):
            level = root.replace(base_dir, '').count(os.sep)
            indent = ' ' * 4 * level
            f_out.write(f'{indent}{os.path.basename(root)}/\n')
            sub_indent = ' ' * 4 * (level + 1)
            for file in files:
                f_out.write(f'{sub_indent}{file}\n')

        f_out.write("\n\n=== 文件详情 ===\n")

        # 遍历所有文件
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, base_dir)

                try:
                    # 跳过生成的输出文件本身
                    if file_path == os.path.abspath(output_file):
                        continue

                    # 写入文件信息
                    f_out.write(f"\n\n■ 文件名: {file}\n")
                    f_out.write(f"■ 路径: {relative_path}\n")
                    f_out.write("-" * 50 + "\n")

                    # 尝试读取文件内容
                    with open(file_path, 'r', encoding='utf-8') as f_in:
                        content = f_in.read()
                        f_out.write(content + "\n")
                except UnicodeDecodeError:
                    # 处理二进制文件
                    f_out.write("[二进制文件内容无法显示]\n")
                except Exception as e:
                    f_out.write(f"[文件读取错误: {str(e)}]\n")

if __name__ == "__main__":
    output_filename = "project_structure.txt"
    scan_directory(output_filename)
    print(f"扫描完成，结果已保存到 {output_filename}")